using Application.Core;
using MediatR;
using Persistence.Data;

namespace Application.Events
{
    public class Delete
    {
         public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var customer = await _context.Events.FindAsync(request.Id);

                if (customer == null) return null;

                _context.Remove(customer);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to delete event");
                
                // (Unit.Value) => return no thing.
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}