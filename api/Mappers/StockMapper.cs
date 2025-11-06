using api.Dtos.Stock;

namespace api.Mappers;

public static class StockMapper
{
    public static StockDto ToDto(this Models.Stock stock)
    {
        return new StockDto
        {
            Id = stock.Id,
            Symbol = stock.Symbol,
            CompanyName = stock.CompanyName,
            Price = stock.Price,
            Divdend = stock.Divdend,
            Industry = stock.Industry,
            MarketCap = stock.MarketCap,
            Comments = [.. stock.Comments.Select(c => c.ToDto())]
        };
    }

    public static Models.Stock ToModel(this StockCreateRequestDto stockDto)
    {
        return new Models.Stock
        {
            Symbol = stockDto.Symbol,
            CompanyName = stockDto.CompanyName,
            Price = stockDto.Price,
            Divdend = stockDto.Divdend,
            Industry = stockDto.Industry,
            MarketCap = stockDto.MarketCap
        };
    }
}
