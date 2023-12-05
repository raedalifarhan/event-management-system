using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Event
    {
        public Guid Id { get; set; }

        [Required, MaxLength(50)]
        public string Title { get; set; }
            = string.Empty;

        public int NumberOfMaxAttende { get; set; }

        public int NumberOfAvailableTickets { get; set; }

        public string? Description { get; set; }

        public DateTime CreateDate { get; set; }
            = DateTime.UtcNow;

        public DateTime EventDate { get; set; }


        [DisplayName("Created By")]
        public string? CreatedById { get; set; }

        [ForeignKey("CreatedById")]
        public AppUser? CreatedBy { get; set; }

        public ICollection<Ticket> Tickets { get; set; } 
            = new List<Ticket>();
    }
}