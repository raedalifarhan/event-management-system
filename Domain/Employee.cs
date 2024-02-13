using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Employee : BaseEntity
    {
        [DisplayName("First Name"), MaxLength(50)]
        public string FirstName { get; set; } 
            = string.Empty;


        [DisplayName("Last Name"), MaxLength(50)]
        public string LastName { get; set; } 
            = string.Empty;


        [DisplayName("Middle Name"), MaxLength(50)]
        public string? MiddleName { get; set; }


        [DisplayName("Mother Name"), MaxLength(50)]
        public string? MotherName { get; set; }


        [DisplayName("Email"), MaxLength(50)]
        public string? Email { get; set; }


        [DisplayName("National Id"), MaxLength(50)]
        public string? NationalId { get; set; }


        [DisplayName("Birth Place"), MaxLength(50)]
        public string? BirthPlace { get; set; }


        [DisplayName("Date of birth"), MaxLength(10)]
        public string? DateOfBirth { get; set; }


        [DisplayName("Starting Date"), MaxLength(10)]
        public string? StartingDate { get; set; }


        [DisplayName("Leaving Date"), MaxLength(10)]
        public string? LeavingDate { get; set; }


        [DisplayName("Qualification"), MaxLength(100)]
        public string? Qualification { get; set; }


        [DisplayName("Specialization"), MaxLength(100)]
        public string? Specialization { get; set; }


        [DisplayName("Phone Number"), MaxLength(14), MinLength(9)]
        public string? PhoneNumber { get; set; }


        [DisplayName("Image")]
        public string? ImagePath { get; set; }


        [DisplayName("File Path")]
        public string? FilePath { get; set; }


        [DisplayName("Notes"), MaxLength]
        public string? Notes { get; set; }


        [DisplayName("Previous Work"), MaxLength(100)]
        public string? PreviousWork { get; set; }


        [DisplayName("Skills"), MaxLength]
        public string? Skills { get; set; }


        [DisplayName("Department")]
        public Guid? DepartmentId { get; set; }
        [ForeignKey(nameof(DepartmentId))]
        public Department? Department { get; set; }

        // nav properties

        [DisplayName("Department")]
        public ICollection<SalaryHistory>? SalaryHistories { get; }


        public ICollection<Vacation>? Vacations { get; }
    }
}
