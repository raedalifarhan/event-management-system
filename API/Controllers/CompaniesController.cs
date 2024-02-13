using Microsoft.AspNetCore.Mvc;
using Application.Companies;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using API.DTOs;
using Microsoft.AspNetCore.Identity;
using Domain;

namespace API.Controllers
{
    [Authorize]
    public class CompaniesController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        public CompaniesController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        //public async Task<IActionResult> Refresh()
        //{

        //}

        [HttpGet]
        public async Task<IActionResult> GetCompanies([FromQuery] CompanyParams param)
        {
            var IdRole = await getCurrentUserIdAndFirstRole();

            return HandlePagedResult(await Mediator!.Send(new List.Query { 
                Params = param, UserId = IdRole.UserId, role = IdRole.Role
            }));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompany(Guid id)
        {
            return HandleResult(await Mediator!.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateCompany([FromBody] CompanyCommandDto model)
        {
            return HandleResult(await Mediator!.Send(new Create.Command { Company = model }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCompany(Guid id, [FromBody] CompanyCommandDto model)
        {
            return HandleResult(await Mediator!.Send(new Edit.Command { Company = model, Id = id }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(Guid id)
        {
            return HandleResult(await Mediator!.Send(new Delete.Command { Id = id }));
        }

        private async Task<UserIdRoleDto> getCurrentUserIdAndFirstRole()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email)!);

            if (user is null) BadRequest("Retry, this user not found");

            var roles = await _userManager.GetRolesAsync(user!);

            if (roles is null) { BadRequest("Retry, this user not found"); }

            return new UserIdRoleDto
            {
                Role = roles[0],
                UserId = user.Id
            };
        }
    }
}
