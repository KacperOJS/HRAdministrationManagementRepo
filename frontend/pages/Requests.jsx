import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaHourglassHalf } from 'react-icons/fa';

const LeaveRequests = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [error, setError] = useState(null);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectionComment, setRejectionComment] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const URL = 'https://localhost:7091/api/LeaveRequest';
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json(); // Attempt to parse JSON
      console.log('Fetched data:', data);
      setRequests(data.map(request => ({ ...request, action: '' })));
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    }
  };

  const updateLeaveRequest = async (id, status, comment) => {
    try {
      const requestToUpdate = requests.find(request => request.id === id);
      const response = await fetch(`https://localhost:7091/api/LeaveRequest/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...requestToUpdate, status, comment }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Check if response body is empty before parsing
      const text = await response.text();
      const updatedRequest = text ? JSON.parse(text) : {};

      const updatedRequests = requests.map(request =>
        request.id === id ? { ...request, status: updatedRequest.status, action: status, comment } : request
      );
      setRequests(updatedRequests);
      console.log(`Request ${id} updated to ${status}`);

      if (status === 'Rejected') {
        closeRejectionModal();
      }
    } catch (error) {
      console.error('Error updating request:', error);
      setError('Error updating request. Please try again later.');
    }
  };

  const handleApproval = async (id, status, comment) => {
    await updateLeaveRequest(id, status, comment);
    // Automatically fetch updated data after approval/rejection
    fetchRequests();
  };

  const openRejectionModal = (id) => {
    console.log(`Opening rejection modal for request ${id}`);
    setSelectedRequest(id);
    setShowRejectionModal(true);
  };

  const closeRejectionModal = () => {
    console.log('Closing rejection modal');
    setShowRejectionModal(false);
    setRejectionComment('');
    setSelectedRequest(null);
  };

  const handleRejectionCommentChange = (event) => {
    setRejectionComment(event.target.value);
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

  const openRequestDetails = (request) => {
    setSelectedRequest(request);
  };

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
      {error && <div className="p-4 text-red-600">{error}</div>}
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
                <tr key={request.id} onClick={() => openRequestDetails(request)} className="cursor-pointer hover:bg-gray-100">
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
                          onClick={(e) => { e.stopPropagation(); handleApproval(request.id, 'Approved', ''); }}
                          className="text-green-600 hover:text-green-900"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); openRejectionModal(request.id); }}
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
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg cursor-pointer">
            <h2 className="text-xl font-bold mb-4">Request Details</h2>
            <p><strong>Employee:</strong> {selectedRequest.employee}</p>
            <p><strong>Start Date:</strong> {new Date(selectedRequest.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(selectedRequest.endDate).toLocaleDateString()}</p>
            <p><strong>Reason:</strong> {selectedRequest.absenceReason}</p>
            <p><strong>Status:</strong> {selectedRequest.status}</p>
            <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mt-4 hover:bg-gray-400" onClick={() => setSelectedRequest(null)}>Close</button>
          </div>
        </div>
      )}
      {showRejectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-1/2">
            <h2 className="text-lg font-semibold mb-4">Add Rejection Comment</h2>
            <textarea
              className="border w-full p-2 mb-4"
              placeholder="Enter rejection comment..."
              value={rejectionComment}
              onChange={handleRejectionCommentChange}
            />
            <div className="flex justify-end">
              <button
                onClick={() => handleApproval(selectedRequest.id, 'Rejected', rejectionComment)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-red-600"
              >
                Reject
              </button>
              <button
                onClick={closeRejectionModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveRequests;
