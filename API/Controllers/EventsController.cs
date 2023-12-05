
using Application.Core;
using Application.Events;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class EventController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetEvents([FromQuery] PagingParams? param)
        {
            return HandlePagedResult(await Mediator!.Send(new List.Query { Params = param }));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEvent(Guid id)
        {
            return Ok(await Mediator!.Send(new Details.Query { Id = id }));
        }

        [HttpPost]
        [Authorize(Roles = RolesNames.ADMIN)]
        public async Task<IActionResult> CreateEvent([FromBody] AddEventDto model)
        {
            return HandleResult(await Mediator!.Send(new Create.Command { Event = model }));
        }

        [HttpPut("{id}")]
        [Authorize(Roles = RolesNames.ADMIN)]
        public async Task<IActionResult> EditEvent(Guid id, EditEventDto model)
        {
            return HandleResult(await Mediator!.Send(new Edit.Command { Event = model, Id = id }));
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = RolesNames.ADMIN)]
        public async Task<IActionResult> DeleteEvent(Guid id)
        {
            return HandleResult(await Mediator!.Send(new Delete.Command { Id = id }));
        }
    }
}