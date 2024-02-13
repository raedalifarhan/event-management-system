using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Companies
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<CompanyListDto>>>
        {
            public CompanyParams? Params { get; set; }
            public string? UserId { get; set; }
            public string? role { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<PagedList<CompanyListDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IWebHostEnvironment _webHostEnvironment;

            public Handler(DataContext context, IMapper mapper, IWebHostEnvironment webHostEnvironment)
            {
                _context = context;
                _mapper = mapper;
                _webHostEnvironment = webHostEnvironment;
            }

            public async Task<Result<PagedList<CompanyListDto>>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var query = 
                    (from comp in _context.Companies.Where(x => x.IsActive)

                    let licenceDetail = _context.LicenceDetails
                        .Where(c => c.CompanyId == comp.Id)
                        .OrderByDescending(c => c.CreateDate)
                        .FirstOrDefault()

                    orderby comp.UpdateDate

                    select new CompanyListDto
                    {
                        Id = comp.Id,
                        Code = comp.Code,
                        CompanyName = comp.CompanyName,
                        PhoneNumber = comp.PhoneNumber,
                        Address = comp.Address,
                        ImageUrl = comp.ImageUrl,
                        LicenceStatus = comp.LicenceStatus,
                        CompanyCapital = comp.CompanyCapital,
                        BranchId = comp.BranchId,
                    }).AsQueryable();

                if (!string.IsNullOrEmpty(request.role) && request.role != "ADMIN")
                {
                    var userBranches = await _context.Branches
                        .Where(x => !string.IsNullOrEmpty(x.BranchManagerId) &&
                            x.BranchManagerId == request.UserId)
                        .Select(x => x.Id.ToString())
                        .ToListAsync();

                    query = query.Where(x => x.BranchId.HasValue && userBranches.Contains(x.BranchId.ToString()!));
                }


                if (!string.IsNullOrEmpty(request.Params?.searchTerm))
                {
                    query = query.Where(x => x.Code.Contains(request.Params.searchTerm) ||
                        x.CompanyName.Contains(request.Params.searchTerm));
                }

                return Result<PagedList<CompanyListDto>>
                    .Success(await PagedList<CompanyListDto>.CreateAsync(query,
                        request.Params!.PageNumber, request.Params.PageSize));
            }
        }
    }
}

