using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Models
{
    public class BaseEntity
    {
        public int Id { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime ModifyDate { get; set; }
    }
}
