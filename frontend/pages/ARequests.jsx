import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaHourglassHalf } from 'react-icons/fa';

const ApprovalRequests = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [rejectionComment, setRejectionComment] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null); // Added state for selected request details

  useEffect(() => {
    fetchApprovalRequests();
  }, []);

  const fetchApprovalRequests = () => {
    const URL = 'https://localhost:7091/api/ApprovalRequest';
    fetch(URL)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        setRequests(data.map(request => ({ ...request, action: '' })));
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const updateApprovalRequest = (id, status, comment) => {
    const URL = `https://localhost:7091/api/ApprovalRequest/${id}`;
    fetch(URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, status, comment })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        // Handle cases where the response might be empty or not JSON
        return res.text().then(text => {
          return text ? JSON.parse(text) : {};
        });
      })
      .then(() => {
        // Update the local state with the new status and comment
        const updatedRequests = requests.map(request =>
          request.id === id ? { ...request, status, action: status, comment } : request
        );
        setRequests(updatedRequests);
      })
      .catch(error => console.error('Error updating request:', error));
  };

  const handleApproval = (id, status, comment) => {
    updateApprovalRequest(id, status, comment);
    setShowRejectionModal(false);
    setRejectionComment('');
  };

  const handleOpenDetails = (request) => {
    console.log(`Opening details for request ${request.id}`);
    setSelectedRequest(request);
  };

  const openRejectionModal = (id) => {
    console.log(`Opening rejection modal for request ${id}`);
    setSelectedRequestId(id);
    setShowRejectionModal(true);
  };

  const closeRejectionModal = () => {
    console.log('Closing rejection modal');
    setShowRejectionModal(false);
    setRejectionComment('');
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
      (request.approver && request.approver.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
      (request.leaveRequest && request.leaveRequest.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Approval Requests</h2>
        <input
          type="text"
          placeholder="Search by approver or leave request"
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
                <th className="text-left py-2 px-3 cursor-pointer" onClick={() => handleSort('approver')}>Approver</th>
                <th className="text-left py-2 px-3 cursor-pointer" onClick={() => handleSort('leaveRequest')}>Leave Request</th>
                <th className="text-left py-2 px-3 cursor-pointer" onClick={() => handleSort('comment')}>Comment</th>
                <th className="text-left py-2 px-3 cursor-pointer" onClick={() => handleSort('status')}>Status</th>
                <th className="text-left py-2 px-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRequests.map(request => (
                <tr key={request.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleOpenDetails(request)}>
                  <td className="py-2 px-3">{request.approver}</td>
                  <td className="py-2 px-3">{request.leaveRequest}</td>
                  <td className="py-2 px-3">{request.comment}</td>
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
                          onClick={() => handleApproval(request.id, 'Approved', '')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => openRejectionModal(request.id)}
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
                  <td colSpan="5" className="text-center py-4">No requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rejection Modal */}
      {showRejectionModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
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
                onClick={() => handleApproval(selectedRequestId, 'Rejected', rejectionComment)}
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

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg cursor-pointer">
            <h2 className="text-xl font-bold mb-2">Request Details</h2>
            <div className="mb-2"><strong>Approver:</strong> {selectedRequest.approver}</div>
            <div className="mb-2"><strong>Leave Request:</strong> {selectedRequest.leaveRequest}</div>
            <div className="mb-2"><strong>Comment:</strong> {selectedRequest.comment}</div>
            <div className="mb-2"><strong>Status:</strong> {selectedRequest.status}</div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600"
              onClick={() => setSelectedRequest(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalRequests;
