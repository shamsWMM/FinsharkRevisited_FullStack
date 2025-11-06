using api.Extensions;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class CommentController(ICommentRepository commentRepository, UserManager<AppUser> userManager) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetList()
    {
        var comments = await commentRepository.GetListAsync();
        return Ok(comments);
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        var comment = await commentRepository.GetByIdAsync(id);

        if (comment == null)
        {
            return NotFound();
        }

        return Ok(comment);
    }

    [HttpPost("{stockID}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Create([FromServices] IStockRepository stockRepository, [FromRoute] int stockID, [FromBody] Dtos.Comment.CommentCreateRequestDto commentDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userName = User.GetUserName();
        var user = await userManager.FindByNameAsync(userName);
        if (user == null)
            return Unauthorized();

        var stockExists = await stockRepository.Exists(stockID);
        if (!stockExists)
        {
            return NotFound("Stock not foubd.");
        }
        
        var comment = await commentRepository.CreateAsync(stockID, commentDto, user.Id);

        return CreatedAtAction(nameof(GetById), new { id = comment.Id }, new { comment });
    }

    [HttpPut("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Dtos.Comment.CommentUpdateRequestDto commentDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        var comment = await commentRepository.UpdateAsync(id, commentDto);
        if (comment == null)
        {
            return NotFound();
        }

        return Ok(comment);
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete([FromRoute] int id)
    {
        var deletedComment = await commentRepository.DeleteAsync(id);
        if (deletedComment == null)
        {
            return NotFound();
        }

        return Ok(deletedComment);
    }
}