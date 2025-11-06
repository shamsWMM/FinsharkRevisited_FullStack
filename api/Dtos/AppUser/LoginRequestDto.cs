using System.ComponentModel.DataAnnotations;

namespace api.Dtos.AppUser;

public class LoginRequestDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }
}