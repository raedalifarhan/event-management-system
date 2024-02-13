
using System.ComponentModel;

namespace Domain
{
    public class JobPosition : BaseEntity
    {
        [DisplayName("Position")]
        public string PositionName { get; set; } = string.Empty;

        public ICollection<SalaryHistory>? SalaryHistories { get; }
    }
}
