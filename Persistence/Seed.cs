using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

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

                // Branch
                if (!context.Branches.Any())
                {
                    var branchList = new List<Branch>
                    {
                        new Branch { BranchName = "دير الزور" , Flag = "DEZ"},
                        new Branch { BranchName = "الطبقة" , Flag = "TBQ"},
                        new Branch { BranchName = "كوباني"  , Flag = "QUB"},
                        new Branch { BranchName = "منبج" , Flag = "MNBJ"},
                        new Branch { BranchName = "ديريك" , Flag = "DRK"},
                        new Branch { BranchName = "القامشلي" , Flag = "QMSH"},
                    };
                    await context.Branches.AddRangeAsync(branchList);
                    await context.SaveChangesAsync();
                }

                // Job Positions
                if (!context.JobPositions.Any())
                {
                    var jobPositionList = new List<JobPosition>
                    {
                        new JobPosition { PositionName = "Assistant" },
                        new JobPosition { PositionName = "Officer" },
                        new JobPosition { PositionName = "Team Leader" },
                        new JobPosition { PositionName = "Manager"  },
                        new JobPosition { PositionName = "Coordinator" },
                        new JobPosition { PositionName = "Head of office" },
                    };
                    await context.JobPositions.AddRangeAsync(jobPositionList);
                    await context.SaveChangesAsync();
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
