using Application.Licences;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class LicenceMappingProfiles : Profile
    {
        public LicenceMappingProfiles()
        {
            // Create Action
            CreateMap<LicenceCreateDto, LicenceDetail>();

            // Update Action
            CreateMap<LicenceUpdateDto, LicenceDetail>();

            // Details Action
            CreateMap<LicenceDetail, LicenceDto>();

        }
    }
}
