using api.Dtos.AppUser;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
[ProducesResponseType(StatusCodes.Status500InternalServerError)]
public class AccountController(UserManager<AppUser> userManager,
    ITokenService tokenService,
    SignInManager<AppUser> signinManager) : ControllerBase
{
    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> LogIn(LoginRequestDto request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var user = await userManager.FindByEmailAsync(request.Email);

        if (user == null)
            return Unauthorized("Invalid credentials.");

        var result = await signinManager
            .CheckPasswordSignInAsync(user, request.Password, false);
        if (!result.Succeeded)
            return Unauthorized("Unsuccessful login attempt.");

        var userToken = tokenService.CreateToken(user);
            return Ok(user.ToResponseDto(userToken));
    }

    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Register([FromBody] Dtos.AppUser.UserCreateRequestDto request)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingUser = await userManager.FindByEmailAsync(request.Email);
            if (existingUser != null)
            {
                ModelState.AddModelError("Email", "Email is already registered");
                return BadRequest(ModelState);
            }

            var appUser = request.ToModel();
           var createResult = await userManager.CreateAsync(appUser, request.Password);
            
            if (!createResult.Succeeded)
            {
                foreach (var error in createResult.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return BadRequest(ModelState);
            }

            var roleResult = await userManager.AddToRoleAsync(appUser, "User");
            if (!roleResult.Succeeded)
                return StatusCode(500, roleResult.Errors);

            var token = tokenService.CreateToken(appUser);
            return Ok(appUser.ToResponseDto(token));
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred during registration" });
        }
    }
}