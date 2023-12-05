using Domain;

namespace API.Services
{
    public interface IAuthService
    {
        public Task<string> CreateToken(AppUser user);

        public Task<List<string?>> GetAllRoles();
    }
}