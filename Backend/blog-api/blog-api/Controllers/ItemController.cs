using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using blog_api.Dto;
using blog_api.Entity;
using blog_api.Service;
using System.IO;
using System.Text.Json;

namespace blog_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class ItemController : ControllerBase
    {
        IItemService _itemService;
        public ItemController(IItemService itemService)
        {
            _itemService = itemService;
        }
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            try
            {
                return Ok(_itemService.Get(id));
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromForm] ItemDto.Add item)
        {
            try
            {
                string path = "";
                string imageName = "";
                if (item.File != null && item.File.Count > 0)
                {

                    IFormFile formFile = item.File[0];
                    string uploads = Path.Combine("Uploads");

                    imageName = Guid.NewGuid().ToString() + ".png";
                    if (formFile.Length > 0)
                    {
                        string extension = Path.GetExtension(formFile.FileName);
                        path = Path.Combine(uploads, imageName);
                        using (Stream fileStream = new FileStream(path, FileMode.Create))
                        {
                            await formFile.CopyToAsync(fileStream);
                        }
                    }
                }
                int userId = Int32.Parse(User.Claims.FirstOrDefault(c => c.Type == "Id").Value);
                return Ok(_itemService.Add(item, userId, imageName));
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpPost("Update")]
        public async Task<IActionResult> Update([FromForm] ItemDto.Update item)
        {

            
            try
            {
                string path = "";
                string imageName = "";
                if (item.File != null && item.File.Count>0)
                {
                    
                    IFormFile formFile = item.File[0];
                    string uploads = Path.Combine("Uploads");
                    
                    imageName = Guid.NewGuid().ToString() + ".png";
                    if (formFile.Length > 0)
                    {
                        string extension = Path.GetExtension(formFile.FileName);
                        path = Path.Combine(uploads, imageName);
                        using (Stream fileStream = new FileStream(path, FileMode.Create))
                        {
                            await formFile.CopyToAsync(fileStream);
                        }
                    }
                }
                
                return Ok(_itemService.Update(item, imageName));
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
        [HttpPost("Delete")]
        public IActionResult Delete([FromBody] int id)
        {
            try
            {
                return Ok(_itemService.Delete(id));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("List/{page}/{size}")]
        public IActionResult List(int page, int size = 10)
        {
            try
            {
                return Ok(_itemService.List(page,size));
            }
            catch
            {
                return BadRequest();
            }
        }
        [HttpGet("top-viewed/{top}")]
        public IActionResult ListTopViewed(int top)
        {
            try
            {
                return Ok(_itemService.ListTopViewed(top));
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
