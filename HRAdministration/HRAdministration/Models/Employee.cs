using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRAdministration.Models
{
    public class Employee
    {
        [Key]
        [Required]
        public int Id { get; set; } 

        [Required]
        [StringLength(100)]
        public string FullName { get; set; } 

        [Required]
        [StringLength(100)]
        public string Subdivision { get; set; } 

        [Required]
        [StringLength(100)]
        public string Position { get; set; } 

        [Required]
        [StringLength(10)]
        public string Status { get; set; } 

        [Required]
        [ForeignKey("PeoplePartnerId")]
        public int PeoplePartner { get; set; } 

        [Required]
        public decimal OutOfOfficeBalance { get; set; } 

        public string? Photo { get; set; } 
    }
}
