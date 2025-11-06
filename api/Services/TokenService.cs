using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Interfaces;
using api.Models;
using Microsoft.IdentityModel.Tokens;

namespace api.Services;

public class TokenService(IConfiguration config) : ITokenService
{
    private readonly SymmetricSecurityKey _key = new (Encoding.UTF8
        .GetBytes(config["Jwt:SigningKey"] ?? throw new InvalidOperationException(
                    "JWT signing key is not configured.")));
    public string CreateToken(AppUser user)
    {
        var claims = CreateClaims(user);
        var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);
        var tokenDescriptor = CreateTokenDescriptor(claims, creds);
        var token = CreateToken(tokenDescriptor);

        return token;
    }

    private List<Claim> CreateClaims(AppUser user)
    {
        var claims = new List<Claim>()
        {
            new (JwtRegisteredClaimNames.Email, user.Email ?? throw new InvalidOperationException(
                "User email not configured")),
            new(JwtRegisteredClaimNames.GivenName, user.UserName ?? throw new InvalidOperationException(
                "User name not configured"))
        };
        return claims;
    }

    private SecurityTokenDescriptor CreateTokenDescriptor(List<Claim> claims, SigningCredentials creds)
    {
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = creds,
            Issuer = config["Jwt:Issuer" ?? throw new InvalidOperationException(
                "Jwt Issuer not configured")],
            Audience = config["Jwt:Audience" ?? throw new InvalidOperationException(
                "Jwt Audience not configured")]
        };
        return tokenDescriptor;
    }

    private  string CreateToken(SecurityTokenDescriptor descriptor)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(descriptor);

        return tokenHandler.WriteToken(token);
    }
}
