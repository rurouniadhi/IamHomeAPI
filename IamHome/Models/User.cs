using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IamHome.Models
{
    public class User {

        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string Email { get; set; }
        public int PhoneNumber { get; set; }
        public bool Status { get; set; }

    }
}