using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Companies
{
    public class Create
    {
        public class Command : IRequest<Result<Guid>>
        {
            public CompanyCommandDto Company { get; set; } = default!;
        }
        public class Handler : IRequestHandler<Command, Result<Guid>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Guid>> Handle(Command request, CancellationToken cancellationToken)
            {
                var Company = _mapper.Map<Company>(request.Company);

                Company.CreateDate = DateTime.Now;

                _context.Companies.Add(Company);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Guid>.Failure("Failed to create Company");

                return Result<Guid>.Success(Company.Id);
            }
        }
    }
}
