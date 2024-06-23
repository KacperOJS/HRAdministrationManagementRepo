import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaHourglassHalf } from 'react-icons/fa';

const LeaveRequests = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });

  useEffect(() => {
    const URL = 'https://localhost:7091/api/LeaveRequest';
    fetch(URL)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        // Simulating initial data fetch from API
        setRequests(data.map(request => ({ ...request, action: '' })));
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleApproval = (id, status) => {
    const updatedRequests = requests.map(request =>
      request.id === id ? { ...request, status, action: status } : request
    );
    setRequests(updatedRequests);

    // Simulate API call to update the status
    console.log(`Request ${id} updated to ${status}`);

    // Simulate recalculating employee absence balance
    // Implement your logic here

    // Optionally, open a modal or form for adding rejection comments
    if (status === 'Rejected') {
      // Example: Open a modal for adding rejection comments
      openRejectionModal(id);
    }
  };

  const openRejectionModal = (id) => {
    // Implement logic to open a modal or form for adding rejection comments
    console.log(`Opening rejection modal for request ${id}`);
    // Example: Show a modal component with input field for comment
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

  const sortedRequests = [...requests].sort((a, b) => {
    if (!a[sortConfig.key] || !b[sortConfig.key]) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredRequests = sortedRequests.filter(request => {
    return (
      (request.employee && request.employee.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
      (request.startDate && request.startDate.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
      (request.endDate && request.endDate.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
      (request.absenceReason && request.absenceReason.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
      (request.status && request.status.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Leave Requests</h2>
        <input
          type="text"
          placeholder="Search by employee, start date, end date, reason, or status"
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
                <th className="text-left py-2 px-3 cursor-pointer" onClick={() => handleSort('employee')}>Employee</th>
                <th className="text-left py-2 px-3 cursor-pointer" onClick={() => handleSort('startDate')}>Start Date</th>
                <th className="text-left py-2 px-3 cursor-pointer" onClick={() => handleSort('endDate')}>End Date</th>
                <th className="text-left py-2 px-3 cursor-pointer" onClick={() => handleSort('absenceReason')}>Reason</th>
                <th className="text-left py-2 px-3 cursor-pointer" onClick={() => handleSort('status')}>Status</th>
                <th className="text-left py-2 px-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRequests.map(request => (
                <tr key={request.id}>
                  <td className="py-2 px-3">{request.employee}</td>
                  <td className="py-2 px-3">{new Date(request.startDate).toLocaleDateString()}</td>
                  <td className="py-2 px-3">{new Date(request.endDate).toLocaleDateString()}</td>
                  <td className="py-2 px-3">{request.absenceReason}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`inline-block px-2 py-1 rounded-lg ${
                        request.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                        request.status === 'Approved' ? 'bg-green-200 text-green-800' :
                        request.status === 'Rejected' ? 'bg-red-200 text-red-800' :
                        'bg-yellow-100 text-blue-500'
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="py-2 px-3 flex space-x-2">
                    {request.action === '' && (
                      <>
                        <button
                          onClick={() => handleApproval(request.id, 'Approved')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => handleApproval(request.id, 'Rejected')}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTimes />
                        </button>
                      </>
                    )}
                    {request.action === 'Approved' && (
                      <button className="text-green-600">
                        <FaCheck />
                      </button>
                    )}
                    {request.action === 'Rejected' && (
                      <button className="text-red-600">
                        <FaTimes />
                      </button>
                    )}
                    {request.action === 'Pending' && (
                      <button className="text-yellow-600">
                        <FaHourglassHalf />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4">No requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequests;
