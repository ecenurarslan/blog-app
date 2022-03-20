using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace blog_api.Dto
{
    public class UserDto
    {
        public class Info {
            public int Id { get; set; }
            public string Username { get; set; }
            public string Token { get; set; }
        }
        public class Login
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }
        public class Register
        {
            public string Username { get; set; }
            public string Password { get; set; }
            public string Email { get; set; }
            public int RoleId { get; set; }
        }
    }
}
