using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Licences
{
    public class LastLicence
    {
        public class Query : IRequest<Result<LicenceDto>>
        {
            public Guid CompanyId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<LicenceDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<LicenceDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var licence = await _context.LicenceDetails
                    .Where(x => x.CompanyId == request.CompanyId)
                    .ProjectTo<LicenceDto>(_mapper.ConfigurationProvider)
                    .OrderByDescending(x => x.DateOfApplication)
                    .FirstOrDefaultAsync();

                return Result<LicenceDto>.Success(licence!);
            }
        }
    }
}
