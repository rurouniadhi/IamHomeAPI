using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IamHome.Models
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int PhoneNumber { get; set; }
        public bool Status { get; set; }
    }
}

