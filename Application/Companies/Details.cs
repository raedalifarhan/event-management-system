using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Companies
{
    public class Details
    {
        public class Query : IRequest<Result<CompanyDetailsDto>> 
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<CompanyDetailsDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<CompanyDetailsDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var Companies = await _context.Companies
                    .ProjectTo<CompanyDetailsDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<CompanyDetailsDto>.Success(Companies!);
            }
        }
    }
}
