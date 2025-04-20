using InvoiceApp.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace InvoiceApp.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Client> Clients { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Invoice>()
                .Property(i => i.Amount)
                .HasPrecision(18, 2); // Precision: 18 digits, Scale: 2 decimal places

            modelBuilder.Entity<Client>()
                .HasMany(c => c.Invoices)
                .WithOne(i => i.Client)
                .HasForeignKey(i => i.ClientId);
        }
    }
}


//Step 2: Remove the Old Migration
//If you’ve already created the InitialCreate migration, you need to remove it before applying the updated configuration:
//-Run the following command in the Package Manager Console:Remove - Migration


//This will undo the last migration without affecting the database schema.

//Step 3: Add the Updated Migration
//After making the changes to the AppDbContext, create a new migration:
//Add - Migration InitialCreate



//Step 4: Apply the Migration
//Apply the new migration to the database:
//Update - Database



//Why Use HasPrecision(18, 2)?
//- Precision (18): Total number of digits (both before and after the decimal point).
//- Scale (2): Number of digits after the decimal point. This configuration is common for financial or monetary values, ensuring data is stored correctly without truncation.

//Once you’ve done this, the warning should disappear, and the Amount field will have the correct precision and scale in your database. Let me know if you encounter any further issues!
