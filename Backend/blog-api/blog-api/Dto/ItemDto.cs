using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace blog_api.Dto
{
    public class ItemDto
    {
        public class PaginatedList
        {
            public double maxPage { get; set; }
            public List<ItemDto.List> ItemList { get; set; }
        }
        public class Add
        {
            public string Title { get; set; }
            public string Description { get; set; }
            public int CategoryId { get; set; }
            public IList<IFormFile> File { get; set; }
        }
        public class Update
        {
            public int Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public IList<IFormFile> File { get; set; }
            public int CategoryId { get; set; }

        }


        public class List
        {
            public int Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public int ViewedBy { get; set; }
            public string Category { get; set; }
            public DateTime CreatedDate { get; set; }
            public DateTime? UpdatedDate { get; set; }
            public string Path { get; set; }
            public int UserId { get; set; }
            public string UserName { get; set; }
            public int CategoryId { get; set; }
        }
    }
}
