import React, { useState, useEffect } from 'react';
import { BsPersonFill, BsThreeDotsVertical } from 'react-icons/bs';

const ConfirmationModal = ({ isOpen, onCancel, onConfirm, fullName }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-4 rounded-lg'>
        <h2>Delete Employee</h2>
        <p>Are you sure you want to delete {fullName}?</p>
        <div className='mt-4 flex justify-end'>
          <button onClick={onCancel} className='bg-gray-500 text-white px-4 py-2 rounded-lg mr-2'>
            No
          </button>
          <button onClick={onConfirm} className='bg-red-500 text-white px-4 py-2 rounded-lg'>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

const Employees = () => {
  const [login, setLogin] = useState('Kacper');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const [selectedSubdivision, setSelectedSubdivision] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    const url = "https://localhost:7091/api/Employee";
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDeactivateClick = () => {
    const updatedEmployees = employees.map(emp =>
      emp.id === selectedEmployee.id ? { ...emp, status: 'Inactive' } : emp
    );
    setEmployees(updatedEmployees);
    setShowModal(false);
  };

  const handleDeleteEmployee = () => {
    fetch(`https://localhost:7091/api/Employee/${selectedEmployee.id}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedEmployees = employees.filter(emp => emp.id !== selectedEmployee.id);
      setEmployees(updatedEmployees);
      setShowModal(false);
    })
    .catch(error => {
      console.error('Error deleting employee:', error);
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  const handleAddEmployee = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const handleSaveNewEmployee = (newEmployee) => {
    fetch("https://localhost:7091/api/Employee", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployee),
    })
    .then(response => response.json())
    .then(data => {
      setEmployees([...employees, data]); // Update local state immediately
      closeAddModal();
    })
    .catch(error => {
      console.error('Error adding employee:', error);
    });
  };
  
  const handleUpdateEmployee = (updatedEmployee) => {
    fetch(`https://localhost:7091/api/Employee/${updatedEmployee.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEmployee),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const updatedEmployees = employees.map(emp =>
        emp.id === data.id ? data : emp
      );
      setEmployees(updatedEmployees);
      closeModal();
      fetchEmployees();
    })
    .catch(error => {
      console.error('Error updating employee:', error);
    });
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

  const sortedEmployees = [...employees];
  if (sortConfig.key) {
    sortedEmployees.sort((a, b) => {
      let comparison = 0;
      if (a[sortConfig.key] > b[sortConfig.key]) {
        comparison = 1;
      } else if (a[sortConfig.key] < b[sortConfig.key]) {
        comparison = -1;
      }
      return sortConfig.direction === 'descending' ? comparison * -1 : comparison;
    });
  }

  const filteredEmployees = sortedEmployees.filter(employee => {
    const fullName = `${employee.fullName}`.toLowerCase();
    const subdivisionMatch = selectedSubdivision ? employee.subdivision === selectedSubdivision : true;
    const statusMatch = selectedStatus ? employee.status === selectedStatus : true;
    const searchTermMatch = fullName.includes(searchTerm.toLowerCase());
    return subdivisionMatch && statusMatch && searchTermMatch;
  });

  return (
    <div className='bg-gray-100 min-h-screen'>
      <div className='flex justify-between p-4'>
        <h2>Employees</h2>
        <h2>Welcome back {login}</h2>
      </div>
      <div className='flex justify-between p-4'>
        <button onClick={handleAddEmployee} className='bg-blue-500 text-white px-4 py-2 rounded-lg'>
          Add Employee
        </button>
        <input
          type='text'
          placeholder='Search by name'
          value={searchTerm}
          onChange={handleSearchChange}
          className='border p-2 rounded-lg'
        />
        <select
          value={selectedSubdivision}
          onChange={(e) => setSelectedSubdivision(e.target.value)}
          className='border p-2 rounded-lg ml-2'
        >
          <option value=''>All Subdivisions</option>
          <option value='IT Department'>IT Department</option>
          <option value='Marketing'>Marketing</option>
          <option value='Finance Department'>Finance Department</option>
          <option value='Operations'>Operations</option>
          <option value='Research and Development'>Research and Development</option>
          <option value='HR Department'>HR Department</option>
          <option value='Security'>Security</option>
          <option value='Customer Service'>Customer Service</option>
          <option value='Sales Department'>Sales Department</option>
        </select>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className='border p-2 rounded-lg ml-2'
        >
          <option value=''>All Statuses</option>
          <option value='Active'>Active</option>
          <option value='Inactive'>Inactive</option>
        </select>
      </div>
      <div className='p-4'>
        <div className='w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto'>
          <div className='my-3 p-2 grid md:grid-cols-8 sm:grid-cols-4 grid-cols-2 items-center justify-between cursor-pointer'>
            <span onClick={() => handleSort('fullName')}>Name</span>
            <span onClick={() => handleSort('subdivision')}>Subdivision</span>
            <span onClick={() => handleSort('position')}>Position</span>
            <span onClick={() => handleSort('status')}>Status</span>
            <span onClick={() => handleSort('peoplePartner')}>People Partner</span>
            <span onClick={() => handleSort('outOfOfficeBalance')}>Out Of Office Balance</span>
            <span>Photo</span>
            <span>Edit Employee</span>
          </div>
          <ul>
            {filteredEmployees.map((employee) => (
              <li key={employee.id} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-8 sm:grid-cols-4 grid-cols-2 items-center justify-between cursor-pointer'>
                <div className='flex items-center'>
                  <div className='bg-purple-100 p-3 rounded-lg'>
                    <BsPersonFill className='text-purple-800' />
                  </div>
                  <p className='pl-4'>{employee.fullName}</p>
                </div>
                <p>{employee.subdivision}</p>
                <p>{employee.position}</p>
                <p>{employee.status}</p>
                <p>{employee.peoplePartner}</p>
                <p>{employee.outOfOfficeBalance}</p>
                <p>{employee.photo ? <img src={employee.photo} alt='Employee' className='w-10 h-10 rounded-full' /> : 'No Photo'}</p>
                <BsThreeDotsVertical onClick={() => {
                  setSelectedEmployee(employee);
                  setShowModal(true);
                }} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showModal && selectedEmployee && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-4 rounded-lg'>
            <h2>Edit Employee</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const updatedEmployee = {
                ...selectedEmployee,
                fullName: e.target.fullName.value,
                subdivision: e.target.subdivision.value,
                position: e.target.position.value,
                status: e.target.status.value,
                peoplePartner: parseInt(e.target.peoplePartner.value),
                outOfOfficeBalance: parseFloat(e.target.outOfOfficeBalance.value),
                photo: e.target.photo.value,
              };
              handleUpdateEmployee(updatedEmployee);
            }}>
              <div>
                <label>Full Name</label>
                <input type='text' name='fullName' className='border p-2 rounded-lg' defaultValue={selectedEmployee.fullName} required />
              </div>
              <div>
                <label>Subdivision</label>
                <input type='text' name='subdivision' className='border p-2 rounded-lg' defaultValue={selectedEmployee.subdivision} required />
              </div>
              <div>
                <label>Position</label>
                <input type='text' name='position' className='border p-2 rounded-lg' defaultValue={selectedEmployee.position} required />
              </div>
              <div>
                <label>Status</label>
                <select name='status' className='border p-2 rounded-lg' defaultValue={selectedEmployee.status} required>
                  <option value='Active'>Active</option>
                  <option value='Inactive'>Inactive</option>
                </select>
              </div>
              <div>
                <label>People Partner</label>
                <input type='number' name='peoplePartner' className='border p-2 rounded-lg' defaultValue={selectedEmployee.peoplePartner} required />
              </div>
              <div>
                <label>Out Of Office Balance</label>
                <input type='number' step='0.01' name='outOfOfficeBalance' className='border p-2 rounded-lg' defaultValue={selectedEmployee.outOfOfficeBalance} required />
              </div>
              <div>
                <label>Photo URL</label>
                <input type='text' name='photo' className='border p-2 rounded-lg' defaultValue={selectedEmployee.photo} />
              </div>
              <div className='mt-4 flex justify-end'>
                <button type='button' onClick={closeModal} className='bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2'>
                  Cancel
                </button>
                <button type='button' onClick={() => setShowConfirmationModal(true)} className='bg-red-500 text-white px-4 py-2 rounded-lg mr-2'>
                  Delete
                </button>
                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-lg'>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showConfirmationModal && (
        <ConfirmationModal
          isOpen={showConfirmationModal}
          onCancel={() => setShowConfirmationModal(false)}
          onConfirm={handleDeleteEmployee}
          fullName={selectedEmployee ? selectedEmployee.fullName : ''}
        />
      )}
      {showAddModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-4 rounded-lg'>
            <h2>Add Employee</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const newEmployee = {
                fullName: e.target.fullName.value,
                subdivision: e.target.subdivision.value,
                position: e.target.position.value,
                status: e.target.status.value,
                peoplePartner: parseInt(e.target.peoplePartner.value),
                outOfOfficeBalance: parseFloat(e.target.outOfOfficeBalance.value),
                photo: e.target.photo.value,
              };
              handleSaveNewEmployee(newEmployee);
            }}>
              <div>
                <label>Full Name</label>
                <input type='text' name='fullName' className='border p-2 rounded-lg' required />
              </div>
              <div>
                <label>Subdivision</label>
                <input type='text' name='subdivision' className='border p-2 rounded-lg' required />
              </div>
              <div>
                <label>Position</label>
                <input type='text' name='position' className='border p-2 rounded-lg' required />
              </div>
              <div>
                <label>Status</label>
                <select name='status' className='border p-2 rounded-lg' required>
                  <option value='Active'>Active</option>
                  <option value='Inactive'>Inactive</option>
                </select>
              </div>
              <div>
                <label>People Partner</label>
                <input type='number' name='peoplePartner' className='border p-2 rounded-lg' required />
              </div>
              <div>
                <label>Out Of Office Balance</label>
                <input type='number' step='0.01' name='outOfOfficeBalance' className='border p-2 rounded-lg' required />
              </div>
              <div>
                <label>Photo URL</label>
                <input type='text' name='photo' className='border p-2 rounded-lg' />
              </div>
              <div className='mt-4 flex justify-end'>
                <button type='button' onClick={closeAddModal} className='bg-red-500 text-white px-4 py-2 rounded-lg mr-2'>
                  Cancel
                </button>
                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-lg'>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
