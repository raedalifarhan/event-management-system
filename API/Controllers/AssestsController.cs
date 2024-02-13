using Microsoft.AspNetCore.Mvc;
using Application.Assests;
using Microsoft.AspNetCore.Authorization;
using Persistence;
using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    public class AssestsController : BaseApiController
    {
        private readonly DataContext _context;
        public AssestsController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> UploadFile(UploadFileDto model)
        {
            return HandleResult(await Mediator!.Send(new Create.Command { model = model }));
        }

        [HttpGet("{fileName}")]
        public async Task<IActionResult> DownloadFile(string fileName)
        {
            var filePath = Path.Combine("wwwroot", "files", fileName);

            if (System.IO.File.Exists(filePath))
            {
                var fileBytes = await System.IO.File.ReadAllBytesAsync(filePath);
                return File(fileBytes, "application/octet-stream", fileName);
            }

            return NotFound("File Not Found");
        }

        [HttpGet]
        public async Task<IActionResult> ExportCompanyAsExcelSheet()
        {
            using (var workBook = new XLWorkbook())
            {
                var workSheet = workBook.Worksheets.Add("companies");
                
                var row = 1;

                workSheet.Cell(row, 1).Value = "Id";
                workSheet.Cell(row, 2).Value = "Code";
                workSheet.Cell(row, 3).Value = "Company Name";
                workSheet.Cell(row, 4).Value = "Company Capital";
                workSheet.Cell(row, 5).Value = "Licence Status";
                workSheet.Cell(row, 6).Value = "Old Comerical Name";
                workSheet.Cell(row, 7).Value = "Address";
                workSheet.Cell(row, 8).Value = "Type Of Activity";
                workSheet.Cell(row, 9).Value = "Commercial Registration No.";
                workSheet.Cell(row, 10).Value = "Violations And Penalties";
                workSheet.Cell(row, 11).Value = "Compliance Officer";
                workSheet.Cell(row, 12).Value = "Create Date";

                foreach (var comp in await _context.Companies.ToListAsync())
                {
                    row++;
                    workSheet.Cell(row, 1).Value = comp?.Id.ToString();
                    workSheet.Cell(row, 2).Value = comp?.Code.ToString();
                    workSheet.Cell(row, 3).Value = comp?.CompanyName.ToString();
                    workSheet.Cell(row, 4).Value = comp?.CompanyCapital.ToString();
                    workSheet.Cell(row, 5).Value = comp?.LicenceStatus.ToString();
                    workSheet.Cell(row, 6).Value = comp?.OldComericalName?.ToString();
                    workSheet.Cell(row, 7).Value = comp?.Address?.ToString();
                    workSheet.Cell(row, 8).Value = comp?.TypeOfActivity?.ToString();
                    workSheet.Cell(row, 9).Value = comp?.CommercialRegistrationNo.ToString();
                    workSheet.Cell(row, 10).Value = comp?.ViolationsAndPenalties?.ToString();
                    workSheet.Cell(row, 11).Value = comp?.ComplianceOfficer?.ToString();
                    workSheet.Cell(row, 12).Value = comp?.CreateDate.ToString();
                }

                using (var stream = new MemoryStream())
                {
                    workBook.SaveAs(stream);
                    var content = stream.ToArray();

                    return File(content, "application/vnd.openxmlforamts-officedocuments.spreadsheetml.sheet", "companies.xlsx");
                }
            }
        }
    }
}
