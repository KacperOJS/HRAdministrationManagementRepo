import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Projectdata } from '../data/ListOfProjects'; // Assuming Projectdata is imported correctly

const Projects = () => {
  const [Login, setLogin] = useState('Kacper'); // Assuming Login state logic is the same as in other components
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState(Projectdata); // Using Projectdata for initial state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });

  const handleEditClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Sorting function based on sortConfig
  const sortedProjects = [...projects].sort((a, b) => {
    if (sortConfig.direction === 'ascending') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
  });

  // Filtering projects based on search term
  const filteredProjects = sortedProjects.filter(project => {
    const projectNameMatch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const projectNumberMatch = project.projectNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return projectNameMatch || projectNumberMatch;
  });

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='flex justify-between p-4'>
        <h2>Projects</h2>
        <h2>Welcome back {Login}</h2>
      </div>
      <div className='flex justify-between p-4'>
        <input
          type='text'
          placeholder='Search by project name or project number'
          value={searchTerm}
          onChange={handleSearchChange}
          className='border p-2 rounded-lg'
        />
      </div>
      <div className='p-4'>
        <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
          <div className='my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
            <span onClick={() => handleSort('projectName')}>Project Name</span>
            <span className='sm:text-left text-right' onClick={() => handleSort('projectNumber')}>Project Number</span>
            <span className='hidden md:grid' onClick={() => handleSort('startDate')}>Start Date</span>
            <span className='hidden sm:grid' onClick={() => handleSort('endDate')}>End Date</span>
            <span className='hidden sm:grid'>Actions</span>
          </div>
          <ul>
            {filteredProjects.map((project, id) => (
              <li key={id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                <div className='flex items-center'>
                  <p className='pl-4'>{project.projectName}</p>
                </div>
                <p className='text-gray-600 sm:text-left text-right'>{project.projectNumber}</p>
                <p className='hidden md:flex'>{project.startDate}</p>
                <p className='hidden sm:flex'>{project.endDate}</p>
                <div className='sm:flex hidden justify-between items-center'>
                  <BsThreeDotsVertical onClick={() => handleEditClick(project)} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-4 rounded-lg'>
            <h2>Project Details</h2>
            <p><strong>Project Name:</strong> {selectedProject.projectName}</p>
            <p><strong>Project Number:</strong> {selectedProject.projectNumber}</p>
            <p><strong>Start Date:</strong> {selectedProject.startDate}</p>
            <p><strong>End Date:</strong> {selectedProject.endDate}</p>
            {/* Add more details as per your project data structure */}
            <div className='flex justify-around mt-4'>
              <button onClick={closeModal} className='bg-gray-500 text-white px-4 py-2 rounded-lg'>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
