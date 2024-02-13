using Application.Core;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Branches
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public BranchCommandDto Branch { get; set; } = default!;

            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var branch = await _context.Branches.FindAsync(request.Id, cancellationToken);

                if (branch == null) return null!;

                _mapper.Map(request.Branch, branch);

                // update properties
                branch!.LastUpdateDate = DateTime.UtcNow.ToString("dd-MM-yyyy hh:mm tt");

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update the branch.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
