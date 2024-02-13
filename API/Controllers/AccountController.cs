using API.DTOs;
using API.Services;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController  : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IAuthService _authService;
        private readonly DataContext _context;

        public AccountController(UserManager<AppUser> userManager,
            RoleManager<IdentityRole> roleManager,
            DataContext context,
            IAuthService authService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _authService = authService;
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> LoginAsync(LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user is null) return Unauthorized();

            var result = await _userManager.CheckPasswordAsync(user, model.Password);
            //var token = _authService.CreateToken(user);

            if (result)
            {
                var role = await _userManager.GetRolesAsync(user);
                if (role != null) {
                    return await CreateUserObject(user, role[0]);
                }

                return await CreateUserObject(user);
            }

            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<ActionResult<UserDto>> RegisterAsync(RegisterDto model)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == model.Email))
            {
                ModelState.AddModelError("email", "Email Taken");
                return ValidationProblem("Email Taken");
            }

            if (await _userManager.Users.AnyAsync(x => x.UserName == model.Username))
            {
                ModelState.AddModelError("username", "Username Taken");
                return ValidationProblem("Username Taken");
            }

            var user = new AppUser
            {
                DisplayName = model.DisplayName,
                Email = model.Email,
                UserName = model.Username,
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                // add user to 'User' role by default.
                await _userManager.AddToRoleAsync(user, RolesNames.USER);

                // get branch obj.
                var branch = await _context.Branches.FindAsync(model.BranchId);
                if (branch != null)
                {
                    branch.BranchManagerId = user.Id;
                    await _context.SaveChangesAsync();
                }



                var role = await _userManager.GetRolesAsync(user);
                if (role != null)
                {
                    return await CreateUserObject(user, role[0]);
                }

                return await CreateUserObject(user);
            }

            return BadRequest(result.Errors);
        }

        [HttpGet("GetCurrentUser")]
        [Authorize]
        public async Task<ActionResult<UserIdRoleDto>> GetCurrentUser()
        {
            return await getCurrentUserIdAndFirstRole();
        }

        [HttpPost("AddRoleAsync")]
        [Authorize(Roles = RolesNames.ADMIN)]
        public async Task<IActionResult> AddRoleAsync(UserIdRoleDto model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId);

            if (user is null || !await _roleManager.RoleExistsAsync(model.Role)) 
                return BadRequest("Invalid User Id or role");

            if (await _userManager.IsInRoleAsync(user, model.Role))
                return BadRequest($"User already assigned to this role");

            var result = await _userManager.AddToRoleAsync(user, model.Role);

            if (!result.Succeeded) return BadRequest(result.Errors);

            return Ok(model);
        }

        [HttpGet("GetAllRoles")]
        [Authorize(Roles = RolesNames.ADMIN)]
        public async Task<ActionResult<List<string?>>> GetAllRoles()
        {
            return await _authService.GetAllRoles();
        }

        private async Task<ActionResult<UserDto>> CreateUserObject(AppUser user, string? role = RolesNames.USER)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Username = user.UserName!,
                Token = await _authService.CreateToken(user),
                Role = role
            };
        }
        private async Task<ActionResult<CurrentUserDto>> CurrentUserObject(AppUser user)
        {
            return new CurrentUserDto
            {
                UserId = user.Id,
                DisplayName = user.DisplayName,
                Username = user.UserName!,
                Token = await _authService.CreateToken(user),
            };
        }

        private async Task<ActionResult<UserIdRoleDto>> getCurrentUserIdAndFirstRole()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email)!);

            if (user is null) BadRequest("Retry, this user not found");

            var roles = await _userManager.GetRolesAsync(user!);

            if (roles is null) { BadRequest("Retry, this user not found"); }

            return new UserIdRoleDto
            {
                Role = roles[0],
                UserId = user.Id
            };
        }
    }
}