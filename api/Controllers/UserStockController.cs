using api.Extensions;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class UserStockController(UserManager<AppUser> userManager,
    IUserStockRepository userStockRepository, IStockRepository stockRepository) : ControllerBase
{
    [HttpGet]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetStockList()
    {
        var username = User.GetUserName();
        var user = await userManager.FindByNameAsync(username);
        var userStocks = await userStockRepository.GetStockListAsync(user);
        return Ok(userStocks);
    }

    [HttpPost("{stockSymbol}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> AddStockToUser(string stockSymbol)
    {
        var username = User.GetUserName();
        var user = await userManager.FindByNameAsync(username);
        if (user == null)
            return Unauthorized();

        var stock = await stockRepository.GetBySymbolAsync(stockSymbol);
        if (stock == null)
            return NotFound($"Stock not found");

        var userStocks = await userStockRepository.GetStockListAsync(user);
        if (userStocks.Any(s => s.Id == stock.Id))
            return BadRequest("Stock already in portfolio");

        var result = await userStockRepository.AddStockToUserAsync(user.Id, stock.Id);
        if (result != true)
            return BadRequest("Failed to add stock to portfolio");

        return Created();
    }

    [HttpDelete("{stockSymbol}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> RemoveStockFromUser(string stockSymbol)
    {
        var username = User.GetUserName();
        var user = await userManager.FindByNameAsync(username);
        if (user == null)
            return Unauthorized();

        var stock = await stockRepository.GetBySymbolAsync(stockSymbol);
        if (stock == null)
            return NotFound($"Stock not found");

        var userStocks = await userStockRepository.GetStockListAsync(user);
        if (!userStocks.Any(s => s.Id == stock.Id))
            return BadRequest("Stock not in portfolio");

        var result = await userStockRepository.RemoveStockFromUserAsync(user.Id, stock.Id);
        if (result != true)
            return BadRequest("Failed to add stock to portfolio");

        return NoContent();
    }
}