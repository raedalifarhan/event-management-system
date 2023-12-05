
using Application.Core;
using Application.Events;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence.Data;

namespace Application.Tickets
{
    public class CancelBookedTicket
    {
         public class Command : IRequest<Result<Unit>>
        {
            public Guid EventId { get; set; }
            public string UserId { get; set; } = string.Empty;
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly ILogger<Create> _logger;
            private readonly UserManager<AppUser> _userManager;

            public Handler(DataContext context, UserManager<AppUser> userManager, ILogger<Create> logger)
            {
                _logger = logger;
                _context = context;
                _userManager = userManager;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var ticket = await _context.Tickets.Include(x => x.Event)
                    .SingleOrDefaultAsync(x => x.UserId == request.UserId 
                        && x.EventId == request.EventId);

                if (ticket == null) return null!;


                ticket.Event!.NumberOfAvailableTickets++;
                _context.Remove(ticket);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to cancel the booked ticket");
                

                
                // (Unit.Value) => return no thing.
                return Result<Unit>.Success(Unit.Value);
            }

        }
    }
}