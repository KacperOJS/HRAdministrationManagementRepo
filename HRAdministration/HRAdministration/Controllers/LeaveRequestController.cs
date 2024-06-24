using HRAdministration.Data;
using HRAdministration.Interfaces;
using HRAdministration.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HRAdministration.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveRequestController : ControllerBase
    {
        private readonly ILeaveRequestRepository _leaveRequestRepository;

        public LeaveRequestController(ILeaveRequestRepository leaveRequestRepository)
        {
            _leaveRequestRepository = leaveRequestRepository;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<LeaveRequest>))]
        [ProducesResponseType(500)]
        public IActionResult GetAllLeaveRequests()
        {
            try
            {
                var leaveRequests = _leaveRequestRepository.GetAllLeaveRequests();
                return Ok(leaveRequests);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving leave requests: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult UpdateLeaveRequest(int id, [FromBody] LeaveRequest leaveRequest)
        {
            if (leaveRequest == null || leaveRequest.Id != id)
            {
                return BadRequest();
            }

            try
            {
                var updated = _leaveRequestRepository.UpdateRequest(leaveRequest);
                if (updated)
                {
                    return NoContent();
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while updating the leave request: {ex.Message}");
            }
        }
    }
}
