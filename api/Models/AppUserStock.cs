using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

[Table(nameof(AppUserStock))]
public class AppUserStock
{
    public string UserId { get; set; }
    public int StockId { get; set; }
    public Stock Stock { get; set; }
    public AppUser User { get; set; }
}
