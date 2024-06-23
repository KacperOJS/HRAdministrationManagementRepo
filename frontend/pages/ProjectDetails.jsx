import React, { useState, useEffect } from 'react';

const ProjectDetails = ({ project }) => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [availableEmployees, setAvailableEmployees] = useState([]);

  useEffect(() => {
    // Fetch available employees from API
    fetchAvailableEmployees();
  }, []);

  const fetchAvailableEmployees = () => {
    // Example API endpoint to fetch employees
    fetch('https://localhost:7091/api/Employee')
      .then(res => res.json())
      .then(data => {
        setAvailableEmployees(data);
      })
      .catch(error => console.error('Error fetching employees:', error));
  };

  const handleEmployeeSelection = (employeeId) => {
    // Toggle selection of employee by ID
    if (selectedEmployees.includes(employeeId)) {
      setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
    } else {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    }
  };

  const handleAssignEmployees = () => {
    // Implement assignment logic here
    // Example: API call to update project with selected employees
    const updatedProject = {
      ...project,
      assignedEmployees: selectedEmployees // Assuming assignedEmployees is a field in your project data
    };

    // Example PUT request to update project with assigned employees
    fetch(`https://localhost:7091/api/Project/${project.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProject),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Handle success scenario
      console.log('Project updated successfully');
    })
    .catch(error => {
      console.error('Error updating project:', error);
    });
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-lg font-bold mb-4">Project Details</h2>
      <p><strong>Project Name:</strong> {project.name}</p>
      <p><strong>Start Date:</strong> {project.startDate}</p>
      <p><strong>End Date:</strong> {project.endDate}</p>
      <p><strong>Status:</strong> {project.status}</p>

      <div className="mt-4">
        <h3 className="text-md font-bold mb-2">Assign Employees</h3>
        <div>
          {availableEmployees.map(employee => (
            <label key={employee.id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedEmployees.includes(employee.id)}
                onChange={() => handleEmployeeSelection(employee.id)}
                className="mr-2"
              />
              {employee.fullName}
            </label>
          ))}
        </div>
        <button
          onClick={handleAssignEmployees}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mt-4"
        >
          Assign Employees
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;
