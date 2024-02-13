using Application.Core;

namespace Application.Companies
{
    public class CompanyParams : PagingParams
    {
        public string? searchTerm { get; set; }
    }
}
