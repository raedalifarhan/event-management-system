using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using App.Helpers;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _config;
        private readonly JWT _jwt;
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AuthService(IConfiguration config, IOptions<JWT> jwt, DataContext context, RoleManager<IdentityRole> roleManager, UserManager<AppUser> userManager )
        {
            _jwt = jwt.Value;
            _config = config;
            _context = context;
            _roleManager = roleManager;
            _userManager = userManager;
        }

        public async Task<string> CreateToken(AppUser user)
        {
            var userClaims = await _userManager.GetClaimsAsync( user );
            var roles = await _userManager.GetRolesAsync( user );
            var roleClaims = new List<Claim>();

            foreach (var role in roles)
                roleClaims.Add(new Claim("roles", role));

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.NameIdentifier, user.UserName!),
                new Claim(ClaimTypes.Email, user.Email!),
            }
            .Union(userClaims)
            .Union(roleClaims);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(_jwt.DurationInDays),
                SigningCredentials = creds,
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public async Task<List<string?>> GetAllRoles()
        {
            return await _context.Roles.Select(x => x.Name).ToListAsync();
        }
    }
}