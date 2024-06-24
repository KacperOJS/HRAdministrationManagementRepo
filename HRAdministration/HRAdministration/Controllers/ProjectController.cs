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
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectController(IProjectRepository projectRepository)
        {
       
            _projectRepository = projectRepository;
        }
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Project>))]
        [ProducesResponseType(500)]
        public IActionResult GetAllProjects()
        {
            try
            {
                var projects = _projectRepository.GetAllProjects();
                return Ok(projects);
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

        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        [ProducesResponseType(500)]
        public IActionResult UpdateProject(int id, Project project)
        {
            if (id != project.Id)
            {
                return BadRequest("Project ID mismatch");
            }

            try
            {
                bool updated = _projectRepository.UpdateRequest(project);
                if (updated)
                {
                    return NoContent();
                }
                else
                {
                    return StatusCode(500, "Failed to update project");
                }
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
