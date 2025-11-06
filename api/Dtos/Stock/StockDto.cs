using api.Dtos.Comment;

namespace api.Dtos.Stock;

public class StockDto
{
    public int Id { get; set; }
    public string Symbol { get; set; } 
    public string CompanyName { get; set; } 
    public decimal Price { get; set; }
    public decimal Divdend { get; set; }
    public string Industry { get; set; } 
    public long MarketCap { get; set; }

    public List<CommentDto> Comments { get; set; }
}
