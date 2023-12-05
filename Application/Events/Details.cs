using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence.Data;

namespace Application.Events
{
    public class Details
    {
        public class Query : IRequest<Result<EventQueryDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<EventQueryDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<EventQueryDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var Event = await _context.Events
                    .ProjectTo<EventQueryDto>(_mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);

                return Result<EventQueryDto>.Success(Event!);
            }
        }
    }
}