using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Branch : BaseEntity
    {
        [Required, MaxLength(50)]
        public string BranchName { get; set; } = default!;

        [Required, MaxLength(20)]
        public string Flag { get; set; } = default!;

        [MaxLength(100)]
        public string? Address { get; set; }


        [MaxLength(256)]
        public string? Description { get; set; }

        public string? BranchManagerId { get; set; }
        [ForeignKey(name: "BranchManagerId")]
        public AppUser? BranchManager { get; set; }

        public ICollection<Company>? Companies { get; set; }
    }
}
