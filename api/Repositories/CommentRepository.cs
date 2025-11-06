using api.Data;
using api.Dtos.Comment;
using api.Mappers;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class CommentRepository(ApplicationDBContext context) : api.Interfaces.ICommentRepository
{
    public async Task<IEnumerable<CommentDto>> GetListAsync()
    {
        return await context.Comments
            .Include(c => c.User)
            .Select(c => c.ToDto())
            .ToListAsync();
    }

    public async Task<CommentDto?> GetByIdAsync(int id)
    {
        return (await context.Comments
            .Include(c => c.User)
            .FirstOrDefaultAsync(c => c.Id == id))?.ToDto();
    }

    public async Task<CommentDto> CreateAsync(int stockID, CommentCreateRequestDto CommentDto, string userId)
    {
        var comment = CommentDto.ToModel(stockID, userId);
        context.Comments.Add(comment);
        await context.SaveChangesAsync();

        return comment.ToDto();
    }

    public async Task<CommentDto?> UpdateAsync(int id, CommentUpdateRequestDto CommentDto)
    {
        var comment = await context.Comments.FindAsync(id);
        if (comment == null)
        {
            return null;
        }

        comment.Title = string.IsNullOrWhiteSpace(CommentDto.Title) ? comment.Title : CommentDto.Title;
        comment.Body = string.IsNullOrWhiteSpace(CommentDto.Body) ? comment.Body : CommentDto.Body;
       
        await context.SaveChangesAsync();

        return comment.ToDto();
    }

    public async Task<CommentDto?> DeleteAsync(int id)
    {
        var comment = await context.Comments.FindAsync(id);
        if (comment == null)
        {
            return null;
        }

        var dto = comment.ToDto();
        context.Comments.Remove(comment);
        await context.SaveChangesAsync();
        return dto;
    }
}
