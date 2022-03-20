using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace blog_api.Dto
{
    public class CategoryDto
    {
        public class List
        {
            public int Id { get; set; }
            public string Name { get; set; }
        }
    }
}
