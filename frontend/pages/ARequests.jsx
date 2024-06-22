import React, { useState,useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Approvaldata } from '@/data/ApprovalData'; // Assuming Approvaldata is imported correctly

const ApprovalRequests = () => {
  const [requests, setRequests] = useState(Approvaldata);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
  let ApprovalRequest;

  const handleApproval = (id, status) => {
    const updatedRequests = requests.map(request =>
      request.id === id ? { ...request, status } : request
    );
    setRequests(updatedRequests);
  };
  useEffect(()=>{
	//URL Powinno sie znajdowac w pliku .ENV 
	const URL = 'https://localhost:7091/api/ApprovalRequest';
	fetch(URL).then(res=>res.json()).then((data)=>{
		ApprovalRequest = data.map((e)=>{
			console.log(e);
		})
	})
  },[])

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
      request.requestNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requester.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Approval Requests</h2>
        <input
          type="text"
          placeholder="Search by request number or requester"
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
                <th className="text-left py-2 px-3 cursor-pointer" onClick={() => handleSort('requestNumber')}>Request Number</th>
                <th className="text-left py-2 px-3 cursor-pointer" onClick={() => handleSort('requester')}>Requester</th>
                <th className="text-left py-2 px-3">Request Date</th>
                <th className="text-left py-2 px-3">Leave Type</th>
                <th className="text-left py-2 px-3">Start Date</th>
                <th className="text-left py-2 px-3">End Date</th>
                <th className="text-left py-2 px-3">Days Requested</th>
                <th className="text-left py-2 px-3">Status</th>
                <th className="text-left py-2 px-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRequests.map(request => (
                <tr key={request.id}>
                  <td className="py-2 px-3">{request.requestNumber}</td>
                  <td className="py-2 px-3">{request.requester}</td>
                  <td className="py-2 px-3">{request.requestDate}</td>
                  <td className="py-2 px-3">{request.leaveType}</td>
                  <td className="py-2 px-3">{request.startDate}</td>
                  <td className="py-2 px-3">{request.endDate}</td>
                  <td className="py-2 px-3">{request.daysRequested}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`inline-block px-2 py-1 rounded-lg ${
                        request.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                        request.status === 'Approved' ? 'bg-green-200 text-green-800' :
                        'bg-red-200 text-red-800'
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="py-2 px-3 flex space-x-2">
                    {request.status === 'Pending' && (
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApprovalRequests;
