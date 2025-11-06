using api.Dtos.Comment;

namespace api.Interfaces;

public interface ICommentRepository
{
    Task<IEnumerable<CommentDto>> GetListAsync();
    Task<CommentDto?> GetByIdAsync(int id);
    Task<CommentDto> CreateAsync(int stockID, CommentCreateRequestDto CommentDto, string userId);
    Task<CommentDto?> UpdateAsync(int id, CommentUpdateRequestDto CommentDto);
    Task<CommentDto?> DeleteAsync(int id);
}

