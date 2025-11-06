using api.Data;
using api.Dtos.Stock;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class UserStockRepository(ApplicationDBContext context) : IUserStockRepository
{
    public async Task<List<StockDto>> GetStockListAsync(AppUser user)
    {
        return await context.AppUserStocks
            .Where(aus => aus.UserId == user.Id)
            .Select(aus => aus.Stock.ToDto())
            .ToListAsync();
    }

    public async Task<bool?> AddStockToUserAsync(string userId, int stockId)
    {
        var userStock = new AppUserStock
        {
            UserId = userId,
            StockId = stockId
        };

        context.AppUserStocks.Add(userStock);
        await context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> RemoveStockFromUserAsync(string userId, int stockId)
    {
        var aus = await context.AppUserStocks
            .FirstOrDefaultAsync(e => e.StockId == stockId && e.UserId == userId);

        if (aus == null)
            return false;

        context.AppUserStocks.Remove(aus);
        await context.SaveChangesAsync();

        return true;
    }
}
