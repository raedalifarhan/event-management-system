
using FluentValidation;

namespace Application.Departments
{
    public class DepartmentValidator : AbstractValidator<DepartmentCommandDto>
    {
        public DepartmentValidator() 
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.DepartmentName).NotEmpty();
            RuleFor(x => x.CreateDate).NotEmpty();
            RuleFor(x => x.BranchId).NotEmpty();
        }
    }
}
