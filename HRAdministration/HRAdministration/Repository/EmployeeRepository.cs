using HRAdministration.Data;
using HRAdministration.Interfaces;
using HRAdministration.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HRAdministration.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;

        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }

        public bool CreateEmployee(Employee employee)
        {
            try
            {
                _context.Employees.Add(employee);
                return Save();
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool DeleteEmployee(int id)
        {
            try
            {
                var employee = _context.Employees.Find(id);
                if (employee == null)
                {
                    return false; 
                }

                _context.Employees.Remove(employee);
                return Save();
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public Employee GetEmployee(int id)
        {
            return _context.Employees.Find(id);
        }

        public Employee GetEmployee(string employeeName)
        {
            return _context.Employees.FirstOrDefault(e => e.FullName == employeeName);
        }

        public ICollection<Employee> GetEmployees()
        {
            return _context.Employees.OrderBy(e => e.Id).ToList();
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

        public bool UpdateEmployee(Employee employee)
        {
            try
            {
                var existingEmployee = _context.Employees.Find(employee.Id);
                if (existingEmployee == null)
                {
                    return false; // Or throw an exception if preferred
                }

                existingEmployee.FullName = employee.FullName;
                existingEmployee.Subdivision = employee.Subdivision;
                existingEmployee.Position = employee.Position;
                existingEmployee.Status = employee.Status;
                existingEmployee.PeoplePartner = employee.PeoplePartner;
                existingEmployee.OutOfOfficeBalance = employee.OutOfOfficeBalance;
                existingEmployee.Photo = employee.Photo;

                _context.Employees.Update(existingEmployee);
                return Save();
            }
            catch (Exception ex)
            {
                // Log the exception or handle as needed
                return false;
            }
        }
    }
}
