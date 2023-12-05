
using Application.Core;
using Application.Tickets;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class TicketsController : BaseApiController
    {
        [HttpGet("{id?}")]
        public async Task<IActionResult> GetTickets([FromQuery] PagingParams? param, Guid? id)
        {
            return HandlePagedResult(await Mediator!.Send(new List.Query { Params = param, UserId = id }));
        }


        [HttpPost]
        public async Task<IActionResult> BookTicket([FromBody] TicketQCommandDto model)
        {
            return HandleResult(await Mediator!.Send(new BookTicket.Command { Event = model }));
        }

        [HttpDelete("{eventId}/{userId}")]
        public async Task<IActionResult> CancelBookedTicket(Guid eventId, string userId)
        {
            return HandleResult(await Mediator!.Send(new CancelBookedTicket.Command { EventId = eventId, UserId = userId }));
        }
    }
}