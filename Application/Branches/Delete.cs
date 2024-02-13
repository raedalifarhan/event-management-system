using Application.Core;
using MediatR;
using Persistence;

namespace Application.Branches
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
                var branch = await _context.Branches.FindAsync(request.Id, cancellationToken);

                if (branch == null) return null!;

                _context.Branches.Remove(branch);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to remove the branch.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
