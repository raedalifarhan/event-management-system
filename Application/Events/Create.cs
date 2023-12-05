using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence.Data;

namespace Application.Events
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public AddEventDto Event { get; set; } = default!;
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly ILogger<Create> _logger;
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper, ILogger<Create> logger)
            {
                _logger = logger;
                _mapper = mapper;
                _context = context;
            }

            // Add Validator (FluentApi)

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                try
                {
                    var Event = _mapper.Map<Event>(request.Event);

                    _context.Events.Add(Event);

                    var result = await _context.SaveChangesAsync() > 0;

                    if (!result) return Result<Unit>.Failure("Failed to create event");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to create event.");
                    return Result<Unit>.Failure("Failed to create event.");
                }
                // documentation says: no need to use async becase all things happened into memory
                
                // (Unit.Value) => return no thing.
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}