using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;

[Table(nameof(Comment))]
public class Comment
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
    public int? StockId { get; set; }
    public Stock? Stock { get; set; }
    public string UserId { get; set; }
    public AppUser User { get; set; }
}