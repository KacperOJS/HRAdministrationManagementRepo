using HRAdministration.Data;
using HRAdministration.Interfaces;
using HRAdministration.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HRAdministration.Repository
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly DataContext _context;

        public ProjectRepository(DataContext context)
        {
            _context = context;
        }

        public bool DeleteRequest(Project project)
        {
            throw new NotImplementedException();
        }

        public ICollection<Project> GetAllProjects()
        {
            return _context.Projects.OrderBy(p => p.Id).ToList();
        }

        public Project GetProject(int id)
        {
            throw new NotImplementedException();
        }

        public bool Save()
        {
            try
            {
                return _context.SaveChanges() > 0;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool UpdateRequest(Project project)
        {
            try
            {
                _context.Entry(project).State = EntityState.Modified;
                return _context.SaveChanges() > 0;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
