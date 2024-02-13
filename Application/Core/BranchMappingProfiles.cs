using Application.Branches;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class BranchMappingProfiles : Profile
    {
        public BranchMappingProfiles()
        {
            // Create Action
            CreateMap<Branch, Branch>();

            // get details
            CreateMap<Branch, BranchQueryDto>();

        }
    }
}
