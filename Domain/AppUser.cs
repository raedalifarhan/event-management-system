using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        [Required, MaxLength(50)]
        public string DisplayName { get; set; } = string.Empty;

        public int? Age { get; set; } 

        public string? Phone { get; set; }

        public ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();
    }
}