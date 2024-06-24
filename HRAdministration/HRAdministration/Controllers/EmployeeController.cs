using HRAdministration.Interfaces;
using HRAdministration.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;

namespace HRAdministration.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeController(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }


        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Employee>))]
        [ProducesResponseType(500)]
        public IActionResult GetAllEmployees()
        {
            try
            {
                var employees = _employeeRepository.GetEmployees();
                return Ok(employees);
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, "Database update error occurred. Please contact support.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }

       
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Employee))]
        [ProducesResponseType(404)] 
        [ProducesResponseType(500)] 
        public IActionResult GetEmployee(int id)
        {
            var employee = _employeeRepository.GetEmployee(id);
            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

     
        [HttpPost]
        [ProducesResponseType(201)] 
        [ProducesResponseType(400)] 
        [ProducesResponseType(500)] 
        public IActionResult CreateEmployee([FromBody] Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _employeeRepository.CreateEmployee(employee);

                return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }

        [HttpPut("{id}")]
        [ProducesResponseType(204)] // NoContent
        [ProducesResponseType(400)] // BadRequest
        [ProducesResponseType(404)] // NotFound
        [ProducesResponseType(500)] // ServerError
        public IActionResult UpdateEmployee(int id, [FromBody] Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest("Employee ID mismatch");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var existingEmployee = _employeeRepository.GetEmployee(id);
                if (existingEmployee == null)
                {
                    return NotFound();
                }

                _employeeRepository.UpdateEmployee(employee);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }


        [HttpDelete("{id}")]
        [ProducesResponseType(204)] 
        [ProducesResponseType(404)] 
        [ProducesResponseType(500)] 
        public IActionResult DeleteEmployee(int id)
        {
            try
            {
                var employeeToDelete = _employeeRepository.GetEmployee(id);
                if (employeeToDelete == null)
                {
                    return NotFound();
                }

                bool deleted = _employeeRepository.DeleteEmployee(id);
                if (!deleted)
                {
                    return StatusCode(500, "Failed to delete the employee. Please try again.");
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred. Please try again later.");
            }
        }
    }
}
