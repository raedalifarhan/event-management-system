using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Department : BaseEntity
    {
        public string DeptName { get; set; }

        public string DeptManager { get; set; }

        public string? Description { get; set; }


        // nav properties
        public Guid? CompanyId { get; set; }
        [ForeignKey(nameof(CompanyId))]
        public Company? Company { get; set; }
      
        public ICollection<Employee>? Employees { get; }
    }
}
