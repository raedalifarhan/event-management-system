using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Data
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DbSet<Event> Events { get; set; }

        public DbSet<Ticket> Tickets { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Ticket>()
            .HasKey(cp => new { cp.UserId, cp.EventId });

            builder.Entity<Ticket>()
                .HasOne(cp => cp.User)
                .WithMany(p => p.Tickets)
                .HasForeignKey(cp => cp.UserId);

            builder.Entity<Ticket>()
                .HasOne(cp => cp.Event)
                .WithMany(c => c.Tickets)
                .HasForeignKey(cp => cp.EventId);
        }
    }
}