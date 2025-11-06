using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Stock;
using api.Models;
using api.QueryObjects;

namespace api.Interfaces;

public interface IStockRepository
{
    Task<IEnumerable<StockDto>> GetListAsync(StockQuery? query);
    Task<StockDto?> GetByIdAsync(int id);
    Task<StockDto?> GetBySymbolAsync(string symbol);
    Task<StockDto> CreateAsync(StockCreateRequestDto stockDto);
    Task<StockDto?> UpdateAsync(int id, StockUpdateRequestDto stockDto);
    Task<StockDto?> DeleteAsync(int id);
    Task<bool> Exists(int stockID);

}
