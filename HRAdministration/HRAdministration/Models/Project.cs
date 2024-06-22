using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRAdministration.Models
{
    public class Project
    {
        [Key]
        [Required]
        public int Id { get; set; } 

        [Required]
        [StringLength(100)]
        public string ProjectType { get; set; } 

        [Required]
        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; } 

        [Required]
        [ForeignKey("EmployeeId")]
        public int ProjectManager { get; set; } 

        [StringLength(1000)]
        public string Comment { get; set; } 

        [Required]
        [StringLength(100)]
        public string Status { get; set; } 
    }
}
