import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ProjectDetails from './ProjectDetails'; // Assuming ProjectDetails is another component

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [employees, setEmployees] = useState([]); // State for storing employees
  const [selectedEmployee, setSelectedEmployee] = useState(''); // State for selected employee ID

  useEffect(() => {
    fetchProjects();
    fetchEmployees(); // Fetch employees when component mounts
  }, []);

  const fetchProjects = () => {
    const URL = 'https://localhost:7091/api/Project'; // Replace with your API endpoint
    fetch(URL)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched projects:', data);
        setProjects(data);
      })
      .catch(error => console.error('Error fetching projects:', error));
  };

  const fetchEmployees = () => {
    const employeeURL = 'https://localhost:7091/api/Employees'; // Replace with your API endpoint for employees
    fetch(employeeURL)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched employees:', data);
        setEmployees(data);
      })
      .catch(error => console.error('Error fetching employees:', error));
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedProjects = [...projects].sort((a, b) => {
    if (!a[sortConfig.key] || !b[sortConfig.key]) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredProjects = sortedProjects.filter(project => {
    return (
      (project.projectType && project.projectType.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (project.startDate && project.startDate.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (project.endDate && project.endDate.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (project.projectManager && project.projectManager.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
      (project.status && project.status.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const deleteProject = (id) => {
    // Implement delete logic here
    console.log(`Deleting project with id ${id}`);
  };

  const openProjectDetails = (project, event) => {
	// Check if the click target is the edit button
	if (event.target.closest('button')?.querySelector('svg')?.classList.contains('text-blue-600')) {
	  return; // If it's the edit icon, return without opening details
	}
  
	setSelectedProject(project);
	setShowProjectDetails(true);
  };
  
  

  const closeProjectDetails = () => {
    setSelectedProject(null);
    setShowProjectDetails(false);
  };

  const assignEmployee = (projectId) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        // Add selectedEmployee to assignedEmployees array
        if (!project.assignedEmployees) {
          project.assignedEmployees = [];
        }
        project.assignedEmployees.push(selectedEmployee);
      }
      return project;
    });
    setProjects(updatedProjects);
    // Optionally, you can update the backend with the assigned employee information
  };

  const handleEmployeeSelection = (event) => {
    setSelectedEmployee(event.target.value); // Update selectedEmployee state
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <input
          type="text"
          placeholder="Search by project type, start date, end date, manager, or status"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border p-2 rounded-lg"
        />
      </div>
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="text-left py-2 px-3 cursor-pointer" onClick={() => handleSort('projectType')}>Project Type</th>
                <th className="text-left py-2 px-3 cursor-pointer" onClick={() => handleSort('startDate')}>Start Date</th>
                <th className="text-left py-2 px-3 cursor-pointer" onClick={() => handleSort('endDate')}>End Date</th>
                <th className="text-left py-2 px-3 cursor-pointer" onClick={() => handleSort('projectManager')}>Project Manager</th>
                <th className="text-left py-2 px-3 cursor-pointer" onClick={() => handleSort('status')}>Status</th>
                <th className="text-left py-2 px-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProjects.map(project => (
                <tr key={project.id} onClick={(event) => openProjectDetails(project, event)} className="cursor-pointer">
                  <td className="py-2 px-3">{project.projectType}</td>
                  <td className="py-2 px-3">{project.startDate ? new Date(project.startDate).toLocaleDateString() : '-'}</td>
                  <td className="py-2 px-3">{project.endDate ? new Date(project.endDate).toLocaleDateString() : '-'}</td>
                  <td className="py-2 px-3">{project.projectManager}</td>
                  <td className="py-2 px-3">{project.status}</td>
                  <td className="py-2 px-3 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                    {/* Assign employee button */}
                    <select
                      value={selectedEmployee}
                      onChange={handleEmployeeSelection}
                      className="text-green-600 hover:text-green-900"
                    >
                      <option value="">Select Employee</option>
                      {employees.map(employee => (
                        <option key={employee.id} value={employee.id}>{employee.fullName}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => assignEmployee(project.id)} // Pass projectId only
                      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg ml-2"
                      disabled={!selectedEmployee}
                    >
                      Assign Employee
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4">No projects found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showProjectDetails && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 max-w-md">
            <h2 className="text-xl font-bold mb-4">Project Details</h2>
            <p className="mb-2"><strong>Project Type:</strong> {selectedProject.projectType}</p>
            <p className="mb-2"><strong>Start Date:</strong> {selectedProject.startDate ? new Date(selectedProject.startDate).toLocaleDateString() : '-'}</p>
            <p className="mb-2"><strong>End Date:</strong> {selectedProject.endDate ? new Date(selectedProject.endDate).toLocaleDateString() : '-'}</p>
            <p className="mb-2"><strong>Project Manager:</strong> {selectedProject.projectManager}</p>
            <p className="mb-2"><strong>Status:</strong> {selectedProject.status}</p>
            <p className="mb-4"><strong>Comment:</strong> {selectedProject.comment}</p>
            {/* Display assigned employees */}
            {selectedProject.assignedEmployees && selectedProject.assignedEmployees.length > 0 && (
              <p className="mb-4"><strong>Assigned Employees:</strong> {selectedProject.assignedEmployees.join(', ')}</p>
            )}
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mr-2" onClick={closeProjectDetails}>Close</button>
            <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg" onClick={() => deleteProject(selectedProject.id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
