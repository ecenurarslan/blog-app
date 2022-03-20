using blog_api.Dto;
using blog_api.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace blog_api.Service
{
    public interface ICategoryService
    {
        GeneralDto.Response Add(string name);
        GeneralDto.Response List();
    }
    public class CategoryService : ICategoryService
    {
        blogContext _context;
        public CategoryService(blogContext context)
        {
            _context = context;
        }
        public GeneralDto.Response Add(string name)
        {
            try
            {
                Category category = new Category
                {
                    Name = name

                };
                _context.Category.Add(category);
                _context.SaveChanges();
                return new GeneralDto.Response { Message = "Successful" };
            }
            catch (Exception)
            {
                return new GeneralDto.Response { Error = true, Message = "Failed to add blog item" };
            }
        }

        public GeneralDto.Response List()
        {
            try
            {
                List<CategoryDto.List> categoryList = _context.Category
                       .Select(s => new CategoryDto.List
                       {
                           Id = s.Id,
                           Name = s.Name,
                       }
                   ).ToList();

                return new GeneralDto.Response { Message = "Successful", Data = categoryList };
            }
            catch (Exception)
            {
                return new GeneralDto.Response { Error = true, Message = "Failed to add blog item" };
            }
        }
    }
}
