using api.Dtos.Stock;
using api.Interfaces;
using api.Mappers;
using api.Models;
using api.QueryObjects;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class StockRepository(Data.ApplicationDBContext context) : IStockRepository
{

    public async Task<IEnumerable<StockDto>> GetListAsync(StockQuery? queryParams)
    {
        var query = context.Stocks.AsQueryable();

        if (queryParams != null)
        {
            query = ApplyQueryParams(queryParams, query);
        }

        return await query.Include(s => s.Comments)
            .ThenInclude( c => c.User)
            .Select(s =>
            s.ToDto()).ToListAsync();
    }

    public async Task<StockDto?> GetByIdAsync(int id)
    {
        return (await context.Stocks
            .Include(s => s.Comments)
            .ThenInclude( c => c.User)
            .FirstOrDefaultAsync(s => s.Id == id))?.ToDto();
    }

    public async Task<StockDto> CreateAsync(StockCreateRequestDto stockDto)
    {
        var stock = stockDto.ToModel();
        context.Stocks.Add(stock);
        await context.SaveChangesAsync();

        return stock.ToDto();
    }

    public async Task<StockDto?> UpdateAsync(int id, StockUpdateRequestDto stockDto)
    {
        var stock = await context.Stocks.FindAsync(id);
        if (stock == null)
        {
            return null;
        }

        stock.Symbol = string.IsNullOrWhiteSpace(stockDto.Symbol) ? stock.Symbol : stockDto.Symbol;
        stock.CompanyName = string.IsNullOrWhiteSpace(stockDto.CompanyName) ? stock.CompanyName : stockDto.CompanyName;
        stock.Price = stockDto.Price == null ? stock.Price : (decimal)stockDto.Price;
        stock.Divdend = stockDto.Divdend == null ? stock.Divdend : (decimal)stockDto.Divdend;
        stock.Industry = string.IsNullOrWhiteSpace(stockDto.Industry) ? stock.Industry : stockDto.Industry;
        stock.MarketCap = stockDto.MarketCap == null ? stock.MarketCap : (long)stockDto.MarketCap;
        await context.SaveChangesAsync();

        return stock.ToDto();
    }

    public async Task<StockDto?> DeleteAsync(int id)
    {
        var stock = await context.Stocks.FindAsync(id);

        if (stock == null)
        {
            return null;
        }
        var dto = stock.ToDto();
        context.Stocks.Remove(stock);
        await context.SaveChangesAsync();
        return dto;
    }

    public async Task<bool> Exists(int stockID)
    {
        return await context.Stocks.AnyAsync(s =>
            s.Id == stockID);
    }

    public async Task<StockDto?> GetBySymbolAsync(string symbol)
    {
        if (string.IsNullOrWhiteSpace(symbol))
            return null;

        symbol = symbol.Trim().ToUpperInvariant();

        return await context.Stocks
            .AsNoTracking()
            .Where(s => s.Symbol.ToUpper() == symbol)
            .Select(s => s.ToDto())
            .FirstOrDefaultAsync();
    }

    private static IQueryable<Stock> ApplyQueryParams(StockQuery queryParams, IQueryable<Stock> query)
    {
        if (!string.IsNullOrWhiteSpace(queryParams.CompanyName))
        {
            query = query.Where(s =>
                s.CompanyName.Contains(queryParams.CompanyName));
        }

        if (!string.IsNullOrWhiteSpace(queryParams.Symbol))
        {
            query = query.Where(s =>
            s.Symbol.Contains(queryParams.Symbol));
        }

        if (!string.IsNullOrWhiteSpace(queryParams.Sort))
            query = ApplySortQueryParams(queryParams, query);

        query = ApplyPaginationQueryParams(queryParams, query);

        return query;
    }

    private static IQueryable<Stock> ApplyPaginationQueryParams(StockQuery queryParams, IQueryable<Stock> query)
    {
        var pageNumber = queryParams.PageNumber ?? 1;
        var pageSize = queryParams.PageSize ?? 20;

        var skip = (pageNumber - 1) * pageSize;

        return query.Skip(skip).Take(pageSize);
    }

    private static IQueryable<Stock> ApplySortQueryParams(StockQuery queryParams, IQueryable<Stock> query)
    {
        var sort = queryParams.Sort ?? string.Empty;
        var desc = queryParams.IsDescending ?? false;

        switch (sort.ToLower())
        {
            case "price":
                query = desc
                    ? query.OrderByDescending(s => s.Price)
                    : query.OrderBy(s => s.Price);
                break;

            case "companyname":
                query = desc
                    ? query.OrderByDescending(s => s.CompanyName)
                    : query.OrderBy(s => s.CompanyName);
                break;

            case "marketcap":
                query = desc
                    ? query.OrderByDescending(s => s.MarketCap)
                    : query.OrderBy(s => s.MarketCap);
                break;

            default:
                break;
        }

        return query;
    }
}