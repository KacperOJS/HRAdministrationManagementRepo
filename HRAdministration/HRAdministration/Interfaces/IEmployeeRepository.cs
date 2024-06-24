using HRAdministration.Models;
using System.Collections.Generic;

namespace HRAdministration.Interfaces
{
    public interface IEmployeeRepository
    {
        Employee GetEmployee(int id);
        Employee GetEmployee(string employeeName);
        ICollection<Employee> GetEmployees();
        bool CreateEmployee(Employee employee);
        bool UpdateEmployee(Employee employee);
        bool DeleteEmployee(int id); 
    }
}
