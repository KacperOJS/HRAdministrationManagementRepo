using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRAdministration.Models
{
    public class ApprovalRequest
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        [ForeignKey("EmployeeId")]
        public int Approver { get; set; } 

        [Required]
        [ForeignKey("LeaveRequestId")]
        public int LeaveRequest { get; set; }

        [Required]
        [StringLength(50)]
        public string Status { get; set; } = "New"; 

        [StringLength(1000)]
        public string Comment { get; set; } 
    }
}
