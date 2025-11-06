using api.Dtos.Stock;
using api.Models;

namespace api.Interfaces;

public interface IUserStockRepository
{
    Task<List<StockDto>> GetStockListAsync(AppUser user);
    Task<bool?> AddStockToUserAsync(string userID, int stockId);
    Task<bool> RemoveStockFromUserAsync(string userId, int stockId);
}