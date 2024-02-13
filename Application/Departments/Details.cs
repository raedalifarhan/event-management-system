using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Departments
{
    public class Details
    {
        public class Query : IRequest<Result<Department>> 
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Department>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Department>> Handle(Query request, CancellationToken cancellationToken)
            {
                var department = await _context.Departments.FindAsync(request.Id);

                return Result<Department>.Success(department!);
            }
        }
    }
}
