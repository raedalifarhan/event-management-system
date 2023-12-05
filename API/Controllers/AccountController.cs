using API.DTOs;
using API.Services;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Domain;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IAuthService _authService;

        public AccountController(UserManager<AppUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IAuthService authService,
            ILogger<AccountController> logger)
        {
            _logger = logger;
            _userManager = userManager;
            _roleManager = roleManager;
            _authService = authService;
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
                return await CreateUserObject(user);
            }

            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<ActionResult<UserDto>> RegisterAsync(RegisterDto model)
        {
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

                return await CreateUserObject(user);
            }

            return BadRequest(result.Errors);
        }

        [HttpGet("GetCurrentUser")]
        [Authorize]
        public async Task<ActionResult<CurrentUserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email)!);

            if (user is null) BadRequest("Retry, this user not found");

            return await CurrentUserObject(user!);
        }

        [HttpPost("AddRoleAsync")]
        [Authorize(Roles = RolesNames.ADMIN)]
        public async Task<IActionResult> AddRoleAsync(AddRoleDto model)
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

        private async Task<ActionResult<UserDto>> CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Username = user.UserName!,
                Token = await _authService.CreateToken(user),
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
    }
}