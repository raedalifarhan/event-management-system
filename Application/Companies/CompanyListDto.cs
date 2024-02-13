namespace Application.Companies
{
    public class CompanyListDto
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string CompanyName { get; set; }
        public string LicenceStatus { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? ImageUrl { get; set; }
        public double CompanyCapital { get; set; }

        public Guid? BranchId { get; set; }
    }
}
