
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Stock;

public class StockCreateRequestDto
{
    [Required]
    [StringLength(10, MinimumLength = 1)]
    public string Symbol { get; set; }
    [Required]
    [StringLength(10, MinimumLength = 1)]
    public string CompanyName { get; set; }
    [Required]
    [Range(1, 1000000000)]
    public decimal Price { get; set; }
    [Required]
    [Range(0.01, 100)]
    public decimal Divdend { get; set; }
    [Required]
    [StringLength(10, MinimumLength = 1)]
    public string Industry { get; set; } 
    [Required]
    [Range(1, 1000000000)]
    public long MarketCap { get; set; }
}
