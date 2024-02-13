using Domain;
using System.ComponentModel.DataAnnotations;

namespace Application.Departments
{
    public class DepartmentQueryDto : BaseEntity
    {

        [MaxLength(50)]
        public string DepartmentName { get; set; } = string.Empty;

        [MaxLength(256)]
        public string? Description { get; set; }

        public string? BranchName { get; set; }

        public Guid? BranchId { get; set; }
    }
}
