using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using blog_api.Dto;
using blog_api.Entity;
using blog_api.Helper;
namespace blog_api.Service
{
    public interface IUserService
    {
        GeneralDto.Response Get();
        GeneralDto.Response Login(UserDto.Login userModel);
        GeneralDto.Response Register(UserDto.Register userModel);

    }
    public class UserService : IUserService
    {
        blogContext _context;
        IConfiguration _configuration;
        public UserService(blogContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public GeneralDto.Response Get()
        {
            return new GeneralDto.Response { Data = "UserService", Message = "Basarili" };
        }
        public GeneralDto.Response Login(UserDto.Login userModel)
        {
            try
            {
                User result = _context.User.Where(user => user.Username == userModel.Username).FirstOrDefault();
                if (result != null)
                {
                    var isPasswordMatched = Hash.VerifyPassword(userModel.Password, result.HashSalt, result.Password);
                    if (isPasswordMatched)
                    {
                        var claimList = new List<Claim> {
                            new Claim("Id", result.Id.ToString()),
                            new Claim(ClaimTypes.Name, userModel.Username),
                            new Claim(ClaimTypes.Role, Enum.GetName(typeof(Enums.UserRole), result.RoleId))
                        };
                        SymmetricSecurityKey authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
                        JwtSecurityToken token = new JwtSecurityToken(
                            issuer: _configuration["JWT:ValidIssuer"],
                            audience: _configuration["JWT:ValidAudience"],
                            expires: DateTime.Now.AddHours(5),
                            claims: claimList,
                            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                            );
                        string tokenString = new JwtSecurityTokenHandler().WriteToken(token);

                        return new GeneralDto.Response
                        {
                            Message = "Login gerceklesti",
                            Data = new UserDto.Info
                            {
                                Token = tokenString,
                                Id = result.Id,
                                Username = result.Username
                            }
                        };
                    }
                    else return new GeneralDto.Response { Error = true, Message = "Incorrect password" };
                }

                return new GeneralDto.Response { Error = true, Message = "No user with this username or email was found" };
            }
            catch (Exception)
            {
                return new GeneralDto.Response { Error = true, Message = "Failed to login" };
            }
        }
        public GeneralDto.Response Register(UserDto.Register userModel)
        {
            try
            {


                User result = _context.User.Where(user => user.Username == userModel.Username || user.Email == userModel.Email).FirstOrDefault();
                if (result == null)
                {
                    var hashsalt = Hash.EncryptPassword(userModel.Password);

                    User user = new User
                    {
                        Username = userModel.Username,
                        Password = hashsalt.Hash,
                        HashSalt = hashsalt.Salt,
                        Email = userModel.Email,
                        RoleId = userModel.RoleId
                    };
                    _context.User.Add(user);
                    _context.SaveChanges();
                    return new GeneralDto.Response { Message = "Basarili" };
                }

                return new GeneralDto.Response { Error = true, Message = "Username or email is already in use" };
            }
            catch (Exception)
            {
                return new GeneralDto.Response { Error = true, Message = "Basarisiz" };
            }
        }
    }
}
