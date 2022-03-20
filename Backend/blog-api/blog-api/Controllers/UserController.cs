using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using blog_api.Dto;
using blog_api.Entity;
using blog_api.Service;
using System.Drawing;
namespace blog_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            try
            {
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
        [Authorize]
        [HttpGet("CheckLogin")]
        public IActionResult CheckLogin()
        {
            return Ok();
        }
        [HttpPost("Login")]
        public IActionResult Login(UserDto.Login login)
        {
            try
            {
                return Ok(_userService.Login (login));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpPost("Register")]
        public IActionResult Register(UserDto.Register user)
        {
            try
            {
                return Ok(_userService.Register(user));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
