
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {   
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<SalaryHistory>()
                .Property(s => s.Salary)
                .HasColumnType("decimal(18, 2)"); // Example precision and scale - adjust as needed
        }

        public DbSet<Branch> Branches { get; set; }
        public DbSet<Company> Companies { get; set; }

        public DbSet<Department> Departments { get; set; }
        public DbSet<LicenceDetail> LicenceDetails { get; set; }

        public DbSet<JobPosition> JobPositions { get; set; }

        public DbSet<Employee> Employees { get; set; }

        public DbSet<Vacation> Vacations { get; set; }

        public DbSet<SalaryHistory> SalaryHistories { get; set; }


    }
}
