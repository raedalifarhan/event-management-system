using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace Application.Assests
{
    public class UploadFileDto
    {
        [Required]
        public Guid Id { get; set; }

        public IFormFile? File { get; set; }
    }
}
