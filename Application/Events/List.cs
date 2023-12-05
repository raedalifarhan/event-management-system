using MediatR;
using Application.Core;
using Persistence.Data;
using AutoMapper.QueryableExtensions;
using AutoMapper;

namespace Application.Events
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<EventQueryDto>>> 
        {
            public PagingParams? Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<EventQueryDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<EventQueryDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Events
                    .ProjectTo<EventQueryDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                return Result<PagedList<EventQueryDto>>.Success(
                    await PagedList<EventQueryDto>.CreateAsync(query,
                        request.Params!.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}