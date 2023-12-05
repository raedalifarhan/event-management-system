namespace Application.Events
{
    public class EventQueryDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; }
            = string.Empty;

        public int NumberOfMaxAttende { get; set; }

        public int NumberOfAvailableTickets { get; set; }

        public string? Description { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime EventDate { get; set; }

        public string? CreatedByUser { get; set; }
    }
}
