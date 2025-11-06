using api.Models;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class ApplicationDBContext(DbContextOptions dbcOptions) : IdentityDbContext<Models.AppUser>(dbcOptions)
{
    public DbSet<Models.Stock> Stocks { get; set; }
    public DbSet<Models.Comment> Comments { get; set; }
    public DbSet<Models.AppUserStock> AppUserStocks { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<AppUserStock>(e => e.HasKey(
            aus => new { aus.UserId, aus.StockId }
        ));
        builder.Entity<AppUserStock>()
            .HasOne(aus => aus.User)
            .WithMany(aus => aus.UserStocks)
            .HasForeignKey(aus => aus.UserId);

        builder.Entity<AppUserStock>()
            .HasOne(aus => aus.Stock)
            .WithMany(aus => aus.UserStocks)
            .HasForeignKey(aus => aus.StockId);
        
        List<IdentityRole> roles = [
            new () {
                Name = "Admin",
                NormalizedName = "ADMIN"
            },
            new () {
                Name = "User",
                NormalizedName = "USER"
            }
        ];
        builder.Entity<IdentityRole>().HasData(roles);
    }
}
