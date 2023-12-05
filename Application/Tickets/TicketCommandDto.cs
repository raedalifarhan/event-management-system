using Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Tickets
{
    public class TicketQCommandDto
    {
        public string UserId { get; set; } = string.Empty;

        public Guid EventId { get; set; }
        
        public string Title { get; set; } = string.Empty;

        public string? Note { get; set; }
    }
}
