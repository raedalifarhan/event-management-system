using Application.Core;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Licences
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public LicenceUpdateDto model { get; set; } = default!;

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
                var licence = await _context.LicenceDetails.FindAsync(request.Id, cancellationToken);

                if (licence == null) return null!;

                _mapper.Map(request.model, licence);

                // update properties
                licence!.UpdateDate = DateTime.UtcNow;
                licence!.DateOfPreliminaryApproval = DateTime.UtcNow;

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update the licence.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
