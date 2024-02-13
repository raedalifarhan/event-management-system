using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace Domain
{
    public class Vacation : BaseEntity
    {
        public string VacationName { get; set; } 
            = string.Empty;


        [DisplayName("Employee")]
        public Guid? EmployeeId { get; set; }
        [ForeignKey(nameof(EmployeeId))]
        public Employee? Employee { get; set; }
    }
}
