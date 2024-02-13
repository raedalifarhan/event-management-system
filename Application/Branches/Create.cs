using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Branches
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public BranchCommandDto Branch { get; set; } = default!;
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
                var branch = _mapper.Map<Branch>(request.Branch);

                branch.CreateDate = DateTime.UtcNow.ToString("dd-MM-yyyy hh:mm tt");

                _context.Branches.Add(branch);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create branch");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
