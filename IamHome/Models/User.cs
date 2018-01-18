using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IamHome.Models {
    public class User {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int PhoneNumber { get; set; }
        [Required]
        public string Email { get; set; }
        public bool Status { get; set; }
    }
}