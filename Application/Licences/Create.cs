using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Licences
{
    public class Create
    {
        public class Command : IRequest<Result<Guid>>
        {
            public LicenceCreateDto model { get; set; } = default!;
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
                var licence = _mapper.Map<LicenceDetail>(request.model);

                licence.CreateDate = DateTime.Now;
                licence.DateOfApplication = DateTime.Now;

                _context.LicenceDetails.Add(licence);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Guid>.Failure("Failed to create licence");

                return Result<Guid>.Success(licence.Id);
            }
        }
    }
}
