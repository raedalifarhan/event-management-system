using MediatR;
using Application.Core;
using Persistence.Data;
using AutoMapper.QueryableExtensions;
using AutoMapper;

namespace Application.Tickets
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<TicketQueryDto>>> 
        {
            public PagingParams? Params { get; set; }
            public Guid? UserId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<TicketQueryDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<TicketQueryDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Tickets
                    .ProjectTo<TicketQueryDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                if (request.UserId is not null)
                    query = query.Where(x => x.UserId == request.UserId.ToString());

                return Result<PagedList<TicketQueryDto>>.Success(
                    await PagedList<TicketQueryDto>.CreateAsync(query,
                        request.Params!.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}