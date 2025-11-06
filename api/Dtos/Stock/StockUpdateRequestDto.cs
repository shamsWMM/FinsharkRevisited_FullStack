
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Stock;

public class StockUpdateRequestDto
{
    [StringLength(10, MinimumLength = 1)]
    public string? Symbol { get; set; }

    [StringLength(10, MinimumLength = 1)]
    public string? CompanyName { get; set; }

    [Range(1, 1000000000)]
    public decimal? Price { get; set; }

    [Range(0.01, 100)]
    public decimal? Divdend { get; set; }

    [StringLength(10, MinimumLength = 1)]
    public string? Industry { get; set; } 

    [Range(1, 1000000000)]
    public long? MarketCap { get; set; }
}
