using api.Dtos.Comment;

namespace api.Mappers;

public static class CommentMapper
{
 public static CommentDto ToDto(this Models.Comment Comment)
    {
        return new CommentDto
        {
            Id = Comment.Id,
            Title = Comment.Title,
            Body = Comment.Body,
            CreatedOn = Comment.CreatedOn,
            CreatedBy = Comment.User.UserName,
            StockId = Comment.StockId,
        };
    }

    public static Models.Comment ToModel(this CommentCreateRequestDto CommentDto, int stockID, string userId)
    {
        return new Models.Comment
        {
            Title = CommentDto.Title,
            Body = CommentDto.Body,
            StockId = stockID,
            UserId = userId
        };
    }
}