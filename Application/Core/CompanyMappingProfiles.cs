using Application.Companies;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class CompanyMappingProfiles : Profile
    {
        public CompanyMappingProfiles()
        {
            // Create Action
            CreateMap<CompanyCommandDto, Company>();

            // get details
            CreateMap<Company, CompanyDetailsDto>();

        }
    }
}
