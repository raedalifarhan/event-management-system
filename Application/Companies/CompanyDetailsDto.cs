using Domain;
using System.ComponentModel.DataAnnotations;

namespace Application.Companies
{
    public class CompanyDetailsDto : BaseEntity
    {
        public string Code { get; set; } = default!;

        // أسم الشركة
        public string CompanyName { get; set; } = default!;

        // اسم الشركة التجاري القديم
        public string? OldComericalName { get; set; }

        // رأس المال
        public double CompanyCapital { get; set; } = 0;

        // حالة الرخصة 
        public string LicenceStatus { get; set; } = "منتهي";

        public string? Info { get; set; }

        // شركة/مكتب
        public string CompanyType { get; set; } = default!;

        // أسماء الشركاء والمؤسسين
        public string? NamesOfPartners { get; set; }

        // رقم الهاتف
        public string PhoneNumber { get; set; } = default!;

        public string? Address { get; set; }

        public string? TypeOfActivity { get; set; }

        // رقم التسجيل بالسجل التجاري
        public string CommercialRegistrationNo { get; set; } = default!;

        // المخالفات و العقوبات 
        public string? ViolationsAndPenalties { get; set; }

        // الموقع الجغرافي
        public string? GeographicalLocation { get; set; }

        // مسؤول الامتثال
        public string? ComplianceOfficer { get; set; }

        // صور شخصية  
        public string? ImageUrl { get; set; }
        public string? ImageName { get; set; }

        // صور شخصية 
        public string? FileUrl { get; set; }
        public string? FileName { get; set; }
        [Required]
        public DateTime CreateDate { get; set; }
        public DateTime? UpdateDate { get; set; }

        // nav properties
        public Guid? BranchId { get; set; }
    }
}
