using Application.Core;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Licences
{
    public class RefreshCompanyInfo
    {
        public class Query : IRequest<Result<Unit>>
        {
            public Guid CompanyId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Query request, CancellationToken cancellationToken)
            {
                // طلب الترخيص 
                var licence = _context.LicenceDetails
                    .Where(c => c.CompanyId == request.CompanyId)
                    .OrderByDescending(c => c.CreateDate)
                    .FirstOrDefault();

                var company = await _context.Companies.FindAsync(request.CompanyId);

                if (licence == null || company == null)
                    return Result<Unit>.Failure("company id is not valid.");

                // Check if the license request is still in progress or has primary agreement
                if (licence.LicenceRequestStatus == LicenceRequestStatusLabels.InProgress ||
                    licence.LicenceRequestStatus == LicenceRequestStatusLabels.PrimaryAgree)
                {
                    if (company.LicenceStatus != TypeOfActivityLabels.NotActive)
                    {
                        company.LicenceStatus = TypeOfActivityLabels.NotActive;
                        await _context.SaveChangesAsync();
                    }
                }
                else if (licence.LicenceRequestStatus == LicenceRequestStatusLabels.UltimateAgree)
                {
                    if ((DateTime.Now - licence.LicenceRequestDate) < TimeSpan.FromDays(365))
                    {
                        // Update license status to Expired
                        company.LicenceStatus = TypeOfActivityLabels.Active;
                        await _context.SaveChangesAsync();
                    }
                }


                // Check if the company's license status is Active and has been active for over a year
                if (company.LicenceStatus == TypeOfActivityLabels.Active)
                {
                    // Assuming CreateDate is the date when the license became active
                    if ((DateTime.Now - licence.LicenceRequestDate) > TimeSpan.FromDays(365))
                    {
                        // Update license status to Expired
                        company.LicenceStatus = TypeOfActivityLabels.Expired;
                        await _context.SaveChangesAsync();
                    }
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
