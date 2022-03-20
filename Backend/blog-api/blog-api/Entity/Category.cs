using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace blog_api.Entity
{
    public partial class Category
    {
        public Category()
        {
            Item = new HashSet<Item>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Item> Item { get; set; }
    }
}
