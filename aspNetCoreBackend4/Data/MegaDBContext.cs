using Microsoft.EntityFrameworkCore;
using aspNetCoreBackend4.Models;



namespace aspNetCoreBackend4.Data
{
    public class MegaDBContext : DbContext
    {
        public DbSet<CustomerAddress> customerAddresses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CustomerAddress>()
                .Property(a => a.id)
                .ValueGeneratedOnAdd();

        }
        public MegaDBContext(DbContextOptions<MegaDBContext> options) : base(options)
        {
        }
    }
}
