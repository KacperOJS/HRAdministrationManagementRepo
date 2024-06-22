using HRAdministration.Data;
using HRAdministration.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HRAdministration.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly DataContext _context;

        public EmployeeController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Employee>))]
        [ProducesResponseType(500)]
        public IActionResult GetAllEmployees()
        {
            try
            {
                var employees = _context.Employees.OrderBy(e => e.Id).ToList();
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
    }
}
