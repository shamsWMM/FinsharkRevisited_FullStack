using api.Interfaces;
using api.Mappers;
using api.QueryObjects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class StockController(IStockRepository stockRepository) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetList([FromQuery] StockQuery? query)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        var stocks = await stockRepository.GetListAsync(query);
        return Ok(stocks);
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get([FromRoute] int id)
    {
        var stock = await stockRepository.GetByIdAsync(id);

        if (stock == null)
        {
            return NotFound();
        }

        return Ok(stock);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    public async Task<IActionResult> Create([FromBody] Dtos.Stock.StockCreateRequestDto stockDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        var stock = await stockRepository.CreateAsync(stockDto);

        return CreatedAtAction(nameof(Get), new { id = stock.Id }, new { stock });
    }

    [HttpPut("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Dtos.Stock.StockUpdateRequestDto stockDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        var stock = await stockRepository.UpdateAsync(id, stockDto);
        if (stock == null)
        {
            return NotFound();
        }

        return Ok(stock);
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var deletedStock = await stockRepository.DeleteAsync(id);

        if (deletedStock == null)
        {
            return NotFound();
        }

        return Ok(deletedStock);
    }
}