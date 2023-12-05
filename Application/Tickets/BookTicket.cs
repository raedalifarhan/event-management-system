using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence.Data;

namespace Application.Tickets
{
    public class BookTicket
    {
        public class Command : IRequest<Result<Unit>>
        {
            public TicketQCommandDto Event { get; set; } = default!;
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly ILogger<BookTicket> _logger;
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper, ILogger<BookTicket> logger)
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
                    var ticket = _mapper.Map<Ticket>(request.Event);

                    var Event = await _context.Events.FindAsync(ticket.EventId, cancellationToken);

                    if (Event!.NumberOfAvailableTickets > 0)
                    {
                        _context.Tickets.Add(ticket);

                        Event!.NumberOfAvailableTickets--;

                        var result = await _context.SaveChangesAsync() > 0;

                        if (!result) return Result<Unit>.Failure("Failed to book ticket");
                    }
                    else return Result<Unit>.Failure("There are no seats available to reserve");


                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to book ticket.");
                    return Result<Unit>.Failure("Failed to book ticket.");
                }
                // documentation says: no need to use async becase all things happened into memory
                
                // (Unit.Value) => return no thing.
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}