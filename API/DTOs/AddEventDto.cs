namespace API.DTOs
{
    public class AddEventDto
    {
        public string Title { get; set; }
            = string.Empty;

        public int NumberOfMaxAttende { get; set; }

        public string? Description { get; set; }

        public DateTime CreateDate { get; set; }

        public DateTime EventDate { get; set; }

        public string? CreatedByUser { get; set; }
    }
}
