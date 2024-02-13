using Domain;
using System.ComponentModel.DataAnnotations;

namespace Application.Departments
{
    public class DepartmentCommandDto : BaseEntity
    {
        [Required, MaxLength(50)]
        public string DepartmentName { get; set; } = string.Empty;

        [MaxLength(256)]
        public string? Description { get; set; }

        [Required]
        public Guid? BranchId { get; set; }
    }
}
