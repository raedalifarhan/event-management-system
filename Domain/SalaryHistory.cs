using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class SalaryHistory : BaseEntity
    {
        [Required]
        [RegularExpression(@"^\d{1,5}\.\d{1,2}$", 
            ErrorMessage = "Please enter a value in the format 00000.00")]
        public decimal Salary { get; set; }

        [DisplayName("Evaluation")]
        public byte? Evaluation { get; set; }
        
        [DisplayName("Note"), MaxLength]
        public string? Note { get; set; } 
            = string.Empty;

        [DisplayName("Employee")]
        public Guid? EmployeeId { get; set; }
        [ForeignKey(nameof(EmployeeId))]
        public Employee? Employee { get; set; }


        [DisplayName("Job Position")]
        public Guid? JobPositionId { get; set; }
        [ForeignKey(nameof(EmployeeId))]
        public JobPosition? JobPosition { get; set; }
    }
}
