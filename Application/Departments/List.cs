using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Departments
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<DepartmentQueryDto>>>
        {
            public DepartmentParams? Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<DepartmentQueryDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<PagedList<DepartmentQueryDto>>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var query = _context.Departments
                    .ProjectTo<DepartmentQueryDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                if (!string.IsNullOrEmpty(request.Params!.BranchId))
                {
                    query = query.Where(x => x.BranchId.ToString() == request.Params!.BranchId);
                }

                if (!string.IsNullOrEmpty(request.Params!.Search))
                {
                    query = query
                        .Where(x => x.DepartmentName!.Contains(request.Params!.Search) ||
                            x.Description!.Contains(request.Params!.Search));
                }

                if (!string.IsNullOrEmpty(request.Params!.Sort))
                {
                    switch (request.Params!.Sort)
                    {
                        case "departmentName":
                            query = query.OrderBy(x => x.DepartmentName);
                            break;
                        case "departmentNamedesc":
                            query = query.OrderByDescending(x => x.DepartmentName);
                            break;
                        case "description":
                            query = query.OrderBy(x => x.Description);
                            break;
                        case "descriptiondesc":
                            query = query.OrderByDescending(x => x.Description);
                            break;
                        case "branchName":
                            query = query.OrderBy(x => x.BranchName);
                            break;
                        case "branchNamedesc":
                            query = query.OrderByDescending(x => x.BranchName);
                            break;
                        case "lastUpdate":
                            query = query.OrderBy(x => x.CreateDate).ThenBy(x => x.LastUpdateDate!);
                            break;
                        case "lastUpdatedesc":
                            query = query.OrderByDescending(x => x.CreateDate).ThenBy(x => x.LastUpdateDate!);
                            break;
                        default:
                            // Handle default sorting (if needed)
                            query = query.OrderBy(x => x.Id);
                            break;
                    }

                }

                return Result<PagedList<DepartmentQueryDto>>
                    .Success(await PagedList<DepartmentQueryDto>.CreateAsync(query,
                        request.Params!.PageNumber, request.Params.PageSize));
            }
        }
    }
}
