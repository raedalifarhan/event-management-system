using Application.Departments;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class DepartmentsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetDepartments([FromQuery] DepartmentParams param)
        {
            return HandlePagedResult(await Mediator!.Send(new List.Query { Params = param }));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDepartment(Guid id)
        {
            return HandleResult(await Mediator!.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateDepartment([FromBody] DepartmentCommandDto model)
        {
            return HandleResult(await Mediator!.Send(new Create.Command { Department = model }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditDepartment(Guid id, [FromBody] DepartmentCommandDto model)
        {
            model.Id = id;
            return HandleResult(await Mediator!.Send(new Edit.Command { Department = model }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDepartment(Guid id)
        {
            return HandleResult(await Mediator!.Send(new Delete.Command { Id = id }));
        }
    }
}
