using blog_api.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace blog_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CategoryController : ControllerBase
    {
        ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("Add")]
        public IActionResult Add(string name)
        {
            try
            {
                return Ok(_categoryService.Add(name));
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("List")]
        public IActionResult List()
        {
            try
            {
                return Ok(_categoryService.List());
            }
            catch
            {
                return BadRequest();
            }
        }

    }
}
