using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using blog_api.Dto;
using blog_api.Entity;
using Microsoft.EntityFrameworkCore;

namespace blog_api.Service
{
    public interface IItemService
    {
        GeneralDto.Response Get(string id);
        GeneralDto.Response Add(ItemDto.Add item, int userId, string path);
        GeneralDto.Response Update(ItemDto.Update item, string path);
        GeneralDto.Response Delete(int id);
        GeneralDto.Response List(int page, int size = 10);
        GeneralDto.Response ListTopViewed(int top);
    }
    public class ItemService : IItemService
    {
        blogContext _context;
        public ItemService(blogContext context)
        {
            _context = context;
        }
        public GeneralDto.Response Get(string id)
        {
            try
            {
                Item result = _context.Item
                    .Include(i=>i.Category)
                    .Include(i=>i.User)
                    .Where(item => item.Id == Int32.Parse(id)).FirstOrDefault();
                if (result != null)
                {
                    result.ViewedBy++;
                    _context.SaveChanges();
                    ItemDto.List response = new ItemDto.List
                    {
                        Id = result.Id,
                        Title = result.Title,
                        Description = result.Description,
                        CreatedDate = result.CreatedDate,
                        Path = result.ImagePath,
                        ViewedBy = result.ViewedBy,
                        Category = result.Category.Name,
                        UpdatedDate = result.UpdatedDate,
                        UserId = result.UserId,
                        UserName = result.User.Username,
                        CategoryId = result.CategoryId,
                    };
                    return new GeneralDto.Response {Data=response, Message = "Basarili" };
                }
                return new GeneralDto.Response { Error = true, Message = "Couldn't find the item" };

            }
            catch (Exception)
            {
                return new GeneralDto.Response { Error = true, Message = "Failed to get item details" };
            }
        }
        public GeneralDto.Response Add(ItemDto.Add itemModel, int userId, string path)
        {
            try
            {
                Item item = new Item
                {
                    Title = itemModel.Title,
                    Description = itemModel.Description,
                    CreatedDate = DateTime.Now,
                    CategoryId = itemModel.CategoryId,
                    ImagePath = path,
                    UserId = userId,
                    ViewedBy = 0,
                    Status = true
                };
                _context.Item.Add(item);
                _context.SaveChanges();
                return new GeneralDto.Response { Message = "Successful" };
            }
            catch (Exception)
            {
                return new GeneralDto.Response { Error = true, Message = "Failed to add blog item" };
            }
        }

        public GeneralDto.Response Update(ItemDto.Update itemModel, string path)
        {
            try
            {
                Item result = _context.Item.Where(item => item.Id == itemModel.Id).FirstOrDefault();
                if (result != null)
                {
                    result.Title = itemModel.Title;
                    result.Description = itemModel.Description;
                    result.ImagePath = path==""?result.ImagePath:path;
                    result.UpdatedDate = DateTime.Now;
                    result.CategoryId = itemModel.CategoryId;
                    _context.SaveChanges();
                    return new GeneralDto.Response { Message = "Basarili" };
                }
                return new GeneralDto.Response { Error = true, Message = "Couldn't find the item" };
            }
            catch (Exception e)
            {
                return new GeneralDto.Response { Error = true, Message = "Basarisiz" };
            }
        }
        public GeneralDto.Response Delete(int id)
        {
            try
            {
                Item result = _context.Item.Where(item => item.Id == id).FirstOrDefault();
                if (result != null)
                {
                    result.Status = false;
                    _context.SaveChanges();
                    return new GeneralDto.Response { Message = "Basarili" };
                }

                return new GeneralDto.Response { Error = true, Message = "Couldn't find the item" };
            }
            catch (Exception)
            {
                return new GeneralDto.Response { Error = true, Message = "Basarisiz" };
            }
        }
        public GeneralDto.Response List(int page, int size = 10)
        {
            try
            {
                List<ItemDto.List> itemList = _context.Item
                    .Include(i => i.Category)
                    .Where(w => w.Status)
                    .OrderByDescending(o => o.UpdatedDate ?? o.CreatedDate)
                    .Skip((page-1)*size)
                    .Take(size)
                    .Select(s => new ItemDto.List
                    {
                        Id = s.Id,
                        Title = s.Title,
                        Description = s.Description,
                        CreatedDate = s.CreatedDate,
                        Path = s.ImagePath,
                        ViewedBy = s.ViewedBy,
                        Category = s.Category.Name,
                        UserId = s.UserId
                    }
                ).ToList();
                double maxPage = Math.Ceiling(Convert.ToDouble(_context.Item.Where(w => w.Status).ToList().Count) / Convert.ToDouble(size));
                return new GeneralDto.Response { Data = new ItemDto.PaginatedList { maxPage= maxPage, ItemList = itemList }, Message = "Basarili" };
            }
            catch (Exception)
            {
                return new GeneralDto.Response { Error = true, Message = "Basarisiz" };
            }
        }
        public GeneralDto.Response ListTopViewed(int top)
        {
            try
            {
                List<ItemDto.List> itemList = _context.Item
                    .Include(i => i.Category)
                    .Where(w => w.Status)
                    .OrderByDescending(o => o.ViewedBy)
                    .Take(top)
                    .Select(s => new ItemDto.List
                    {
                        Id = s.Id,
                        Title = s.Title,
                        Description = s.Description,
                        CreatedDate = s.CreatedDate,
                        Path = s.ImagePath,
                        ViewedBy = s.ViewedBy,
                        Category = s.Category.Name
                    }
                ).ToList();

                return new GeneralDto.Response { Data = itemList, Message = "Basarili" };
            }
            catch (Exception)
            {
                return new GeneralDto.Response { Error = true, Message = "Basarisiz" };
            }
        }
    }
}
