using System.ComponentModel.DataAnnotations;

namespace Application.Licences
{
    public class LicenceUpdateDto
    {
        public double? ApplicationFee { get; set; }

        // رقم الترخيص
        public string? LicenceNo { get; set; }

        // رسم الترخيص
        [Required]
        public double? LicenceFee { get; set; }

        // الضمانة المالية
        [Required]
        public double? FinancialGuarantee { get; set; }

        public string? Notes { get; set; }

        // حالة طلب الترخيص
        [Required]
        public string LicenceRequestStatus { get; set; }



        // nav properties
        public Guid CompanyId { get; set; }
    }
}
