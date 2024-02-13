using Application.Core;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Companies
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public CompanyCommandDto Company { get; set; } = default!;

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
                var Company = await _context.Companies.FindAsync(request.Id, cancellationToken);

                if (Company == null) return null!;

                _mapper.Map(request.Company, Company);

                // update properties
                Company!.UpdateDate = DateTime.UtcNow;

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update the Company.");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
