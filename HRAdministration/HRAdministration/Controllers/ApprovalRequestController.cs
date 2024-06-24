using HRAdministration.Interfaces;
using HRAdministration.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HRAdministration.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApprovalRequestController : ControllerBase
    {
        private readonly IApprovalRequestRepository _approvalRequestRepository;

        public ApprovalRequestController(IApprovalRequestRepository approvalRequestRepository)
        {
            _approvalRequestRepository = approvalRequestRepository;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<ApprovalRequest>))]
        [ProducesResponseType(500)]
        public IActionResult GetAllApprovalRequests()
        {
            try
            {
                var requests = _approvalRequestRepository.GetAllApprovalRequests();
                return Ok(requests);
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "Database update error occurred. Please contact support.");
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }

        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult UpdateApprovalRequest(int id, [FromBody] ApprovalRequest updatedRequest)
        {
            if (updatedRequest == null || id != updatedRequest.Id)
            {
                return BadRequest("Invalid request data");
            }

            var existingRequest = _approvalRequestRepository.GetApprovalRequest(id);
            if (existingRequest == null)
            {
                return NotFound($"Approval request with ID {id} not found");
            }

            try
            {
                existingRequest.Status = updatedRequest.Status;
                existingRequest.Comment = updatedRequest.Comment;

                if (!_approvalRequestRepository.UpdateRequest(existingRequest))
                {
                    return StatusCode(500, "A problem happened while handling your request.");
                }

                return NoContent();
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "Database update error occurred. Please contact support.");
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }
    }
}
