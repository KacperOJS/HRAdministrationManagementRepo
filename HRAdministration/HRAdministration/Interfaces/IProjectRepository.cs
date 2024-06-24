using HRAdministration.Models;

namespace HRAdministration.Interfaces
{
    public interface IProjectRepository
    {
        ICollection<Project> GetAllProjects();
        Project GetProject(int id);
        bool UpdateRequest(Project project);
        bool DeleteRequest(Project project);
        bool Save();
    }
}
