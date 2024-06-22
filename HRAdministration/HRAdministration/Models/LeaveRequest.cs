using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRAdministration.Models
{
    public class LeaveRequest
    {
        [Key]
        [Required]
        public int Id { get; set; } 

        [Required]
        [ForeignKey("EmployeeId")]
        public int Employee { get; set; } 

        [Required]
        [StringLength(100)]
        public string AbsenceReason { get; set; } 

        [Required]
        public DateTime StartDate { get; set; } 

        [Required]
        public DateTime EndDate { get; set; } 

        [StringLength(1000)]
        public string Comment { get; set; }

        [Required]
        [StringLength(50)]
        public string Status { get; set; } = "New"; 
    }
}
