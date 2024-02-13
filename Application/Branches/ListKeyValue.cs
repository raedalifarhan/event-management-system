using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Branches
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<BranchQueryDto>>> 
        {
            public PagingParams? Params { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<PagedList<BranchQueryDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<PagedList<BranchQueryDto>>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var query = _context.Branches
                    .ProjectTo<BranchQueryDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                return Result<PagedList<BranchQueryDto>>
                    .Success(await PagedList<BranchQueryDto>.CreateAsync(query,
                        request.Params!.PageNumber, request.Params.PageSize));
            }
        }
    }
}
