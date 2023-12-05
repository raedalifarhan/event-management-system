using Domain;
using FluentValidation;

namespace Application.Customers
{
    // FluentApi
    public class CustomerValidator : AbstractValidator<Event>
    {
        public CustomerValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
        }
    }
}