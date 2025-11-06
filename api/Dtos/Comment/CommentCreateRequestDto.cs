using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Comment;

public class CommentCreateRequestDto
{
    [Required]
    [StringLength(50, MinimumLength = 5)]
    public string Title { get; set; }
    [Required]
    [StringLength(50, MinimumLength = 5)]
    public string Body { get; set; }
}