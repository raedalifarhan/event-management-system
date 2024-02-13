using System.ComponentModel.DataAnnotations;

namespace Application.Branches
{
    public class BranchCommandDto
    {

        [Required, MaxLength(50)]
        public string BranchName { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? Address { get; set; }

        [Required, MaxLength(50)]
        public string? Description { get; set; }
    }
}
