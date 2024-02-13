using Microsoft.AspNetCore.Mvc;
using Application.Branches;
using Application.Core;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Authorize]
    public class BranchesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetBranches([FromQuery] PagingParams param)
        {
            return HandleResult(await Mediator!.Send(new List.Query { Params = param }));
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetBranch(Guid id)
        {
            return HandleResult(await Mediator!.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateBranch([FromBody] BranchCommandDto model)
        {
            return HandleResult(await Mediator!.Send(new Create.Command { Branch = model }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditBranch(Guid id, [FromBody] BranchCommandDto model)
        {
            return HandleResult(await Mediator!.Send(new Edit.Command { Branch = model, Id = id }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return HandleResult(await Mediator!.Send(new Delete.Command { Id = id }));
        }
    }
}
