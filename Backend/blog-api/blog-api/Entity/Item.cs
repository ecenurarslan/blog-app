using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace blog_api.Entity
{
    public partial class Item
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool Status { get; set; }
        public int UserId { get; set; }
        public string ImagePath { get; set; }
        public int CategoryId { get; set; }
        public int ViewedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public virtual Category Category { get; set; }
        public virtual User User { get; set; }
    }
}
