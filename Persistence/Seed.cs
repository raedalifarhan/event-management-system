using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence.Data;


namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, 
            UserManager<AppUser> userManager, 
            RoleManager<IdentityRole> _roleManager, 
            ILoggerFactory loggerFactory)
        {
            try
            {
                // Users & Role
                if (!userManager.Users.Any())
                {
                    // Create roles
                    var roles = new List<IdentityRole>
                    {
                        new IdentityRole { Name = RolesNames.USER },
                        new IdentityRole { Name = RolesNames.ADMIN },
                    };

                    // Add roles to the context and save changes
                    foreach (var role in roles)
                    {
                        await _roleManager.CreateAsync(role);
                    }
                    await context.SaveChangesAsync();

                    // Create a user
                    var user = new AppUser
                    {
                        DisplayName = "manager",
                        UserName = "manager",
                        Email = "manager@manager.com"
                    };

                    // Create the user
                    var createdUser = await userManager.CreateAsync(user, "Pa$$w0rd");

                    // Check if the user was successfully created before assigning roles
                    if (createdUser.Succeeded)
                    {
                        // Find the ADMIN role
                        var adminRole = await context.Roles.Where(x => x.Name == RolesNames.ADMIN).FirstOrDefaultAsync();

                        if (adminRole != null)
                        {
                            // Add the user to the ADMIN role
                            await userManager.AddToRoleAsync(user, adminRole?.Name!);

                            // Save changes after adding the user to the role
                            await context.SaveChangesAsync();
                        }
                    }

                }



            }
            catch (SystemException ex)
            {
                var logger = loggerFactory.CreateLogger<Seed>();
                logger.LogError(ex.Message);
            }
        }
    }
}
