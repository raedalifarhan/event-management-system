using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Branches
{
    public class ListKeyValue
    {
        public class Query : IRequest<Result<PagedList<BranchKeyValueDto>>> 
        {
            public PagingParams? Params { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<PagedList<BranchKeyValueDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<PagedList<BranchKeyValueDto>>> Handle(Query request,
                CancellationToken cancellationToken)
            {
                var query = _context.Branches
                    .ProjectTo<BranchKeyValueDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                return Result<PagedList<BranchKeyValueDto>>
                    .Success(await PagedList<BranchKeyValueDto>.CreateAsync(query,
                        request.Params!.PageNumber, request.Params.PageSize));
            }
        }
    }
}
