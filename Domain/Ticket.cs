using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Domain
{
    public class Ticket
    {

        [Required, MaxLength(50)]
        public string Title { get; set; }
            = string.Empty;

        public string? Note { get; set; }

        public DateTime CreateDate { get; set; }
            = DateTime.UtcNow;

        public string? UserId { get; set; }
        [ForeignKey("UserId")]
        [JsonIgnore]
        public AppUser? User { get; set; }

        // [JsonIgnore]
        public Guid? EventId { get; set; }
        [ForeignKey("EventId")]
        //[JsonIgnore]
        public Event? Event { get; set; }
    }
}