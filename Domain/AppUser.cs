
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        [Required, MaxLength(50)]
        public string DisplayName { get; set; } = default!;
    }
}
