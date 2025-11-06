using api.Dtos.AppUser;

namespace api.Mappers;

public static class AppUserMapper
{
    public static Models.AppUser ToModel(this UserCreateRequestDto request)
    {
        return new Models.AppUser
        {
            UserName = request.UserName,
            Email = request.Email
        };
    }

    public static UserResponseDto ToResponseDto(this Models.AppUser user, string? token)
    {
        return new UserResponseDto
        {
            UserName = user.UserName,
            Email = user.Email,
            Token = token
        };
    }
}
