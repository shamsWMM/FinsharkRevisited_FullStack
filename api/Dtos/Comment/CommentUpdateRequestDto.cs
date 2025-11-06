using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Comment;

public class CommentUpdateRequestDto
{
    [StringLength(50, MinimumLength = 5)]
    public string? Title { get; set; }
    [StringLength(50, MinimumLength = 5)]
    public string? Body { get; set; }
}