using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence.Data;

namespace Application.Events
{
    public class Edit
    {
         public class Command : IRequest<Result<Unit>>
        {
            public EditEventDto Event { get; set; } = default!;
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            // Add Validator (FluentApi)

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var Event = await _context.Events.FindAsync(request.Id);

                if (Event == null) return null;

                
                var result = request.Event.NumberOfMaxAttende - Event.NumberOfMaxAttende;

                if (result > 0)
                    Event.NumberOfAvailableTickets += result;
                else if (result < 0)
                {
                    var bookedCount = Event.NumberOfMaxAttende - Event.NumberOfAvailableTickets;

                    if ((-result) < bookedCount)
                        Event.NumberOfAvailableTickets += result;
                    else
                        return Result<Unit>.Failure($"Wrong entry => number of booked seats is: {bookedCount} " +
                            $"> NumberOfMaxAttende that you entered: ${request.Event.NumberOfMaxAttende}");
                }

                _mapper.Map(request.Event, Event);

                var resultOfUpdate = await _context.SaveChangesAsync() > 0;

                if (!resultOfUpdate) return Result<Unit>.Failure("Failed to update event");
                
                // (Unit.Value) => return no thing.
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}