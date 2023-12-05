
// this folder contain all files that uses into "Application" folder
using Application.Events;
using Application.Tickets;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Event, Event>();

            CreateMap<Event, EventQueryDto>()
                .ForMember(d => d.CreatedByUser, o => o.MapFrom(s => s.CreatedBy!.UserName));

            CreateMap<AddEventDto, Event>()
            .ForMember(d => d.NumberOfAvailableTickets, o => o.MapFrom(s => s.NumberOfMaxAttende));

            CreateMap<EditEventDto, Event>();

            CreateMap<Ticket, TicketQueryDto>()
                .ForMember(d => d.UserName, o => o.MapFrom(s => s.User!.UserName))
                .ForMember(d => d.EventId, o => o.MapFrom(s => s.EventId))
                .ForMember(d => d.EventTitle, o => o.MapFrom(s => s.Event!.Title))
                .ForMember(d => d.EventDate, o => o.MapFrom(s => s.Event!.EventDate))
                .ForMember(d => d.TicketTitle, o => o.MapFrom(s => s.Event!.Title))
            ;

            CreateMap<TicketQCommandDto, Ticket>();
        }
    }
}

