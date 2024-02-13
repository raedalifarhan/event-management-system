using Domain;
using System.ComponentModel.DataAnnotations;

namespace Application.Branches
{
    public class BranchKeyValueDto : BaseEntity
    {

        [MaxLength(50)]
        public string BranchName { get; set; } = string.Empty;

        [MaxLength(256)]
        public string? Description { get; set; }
    }
}
