using Application.Core;

namespace Application.Departments
{
    public class DepartmentParams : PagingParams
    {
        public string? BranchId { get; set; }

        public string? Search { get; set; }

        public string? Sort { get; set; }
    }
}
