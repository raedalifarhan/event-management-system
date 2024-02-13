using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Licences;

namespace API.Controllers
{
    [AllowAnonymous]
    public class LicencesController : BaseApiController
    {
        [HttpGet("{companyId}")]
        public async Task<IActionResult> GetLicence(Guid CompanyId)
        {
            await Mediator!.Send(new RefreshCompanyInfo.Query { CompanyId = CompanyId });

            return HandleResult(await Mediator!.Send(new LastLicence.Query { CompanyId = CompanyId }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateLicence([FromBody] LicenceCreateDto model)
        {
            return HandleResult(await Mediator!.Send(new Create.Command { model = model }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditLicence(Guid id, [FromBody] LicenceUpdateDto model)
        {
            return HandleResult(await Mediator!.Send(new Edit.Command { model = model, Id = id }));
        }
    }
}
