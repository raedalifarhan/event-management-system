namespace Application.Tickets
{
    public class TicketQueryDto
    {
        public Guid EventId { get; set; }

        public string UserId { get; set; } = string.Empty;

        public string UserName { get; set; } = string.Empty;
        
        public string TicketTitle { get; set; } = string.Empty;

        public string? Note { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime EventDate { get; set; }

        public string EventTitle { get; set; } = string.Empty;
    }
}
