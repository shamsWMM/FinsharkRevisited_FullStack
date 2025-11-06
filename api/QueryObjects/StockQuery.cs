using System.ComponentModel.DataAnnotations;

namespace api.QueryObjects;
public class StockQuery
{
    public string? Symbol { get; set; }
    public string? CompanyName { get; set; }
    public string? Sort { get; set; }
    public bool? IsDescending { get; set; }
    [Range(1, 1000000000)]
    public int? PageNumber { get; set; }
    [Range(1, 1000000000)]
    public int? PageSize { get; set; }
}