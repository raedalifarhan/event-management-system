using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Branches
{
    public class Details
    {
        public class Query : IRequest<Result<BranchQueryDto>> 
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<BranchQueryDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<BranchQueryDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var branches = await _context.Branches
                    .ProjectTo<BranchQueryDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<BranchQueryDto>.Success(branches!);
            }
        }
    }
}
