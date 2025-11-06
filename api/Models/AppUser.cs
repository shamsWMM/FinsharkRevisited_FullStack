using Microsoft.AspNetCore.Identity;

namespace api.Models;

public class AppUser : IdentityUser
{
    public List<AppUserStock> UserStocks { get; set; } = [];
}
