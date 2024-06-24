using HRAdministration.Data;
using HRAdministration.Interfaces;
using HRAdministration.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace HRAdministration.Repository
{
    public class LeaveRequestRepository : ILeaveRequestRepository
    {
        private readonly DataContext _context;

        public LeaveRequestRepository(DataContext context)
        {
            _context = context;
        }

        public bool DeleteRequest(LeaveRequest leaveRequest)
        {
            throw new NotImplementedException();
        }


        public ICollection<LeaveRequest> GetAllLeaveRequests()
        {
            return _context.LeaveRequests.OrderBy(x => x.Id).ToList();
        }

        public LeaveRequest GetLeaveRequest(int id)
        {
            throw new NotImplementedException();
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

        public bool UpdateRequest(LeaveRequest leaveRequest)
        {
            try
            {
                var existingLeaveRequest = _context.LeaveRequests.FirstOrDefault(l => l.Id == leaveRequest.Id);
                if (existingLeaveRequest != null)
                {
                    existingLeaveRequest.Id = leaveRequest.Id;
                    existingLeaveRequest.Employee = leaveRequest.Employee;
                    existingLeaveRequest.StartDate = leaveRequest.StartDate;
                    existingLeaveRequest.EndDate = leaveRequest.EndDate;
                    existingLeaveRequest.Status = leaveRequest.Status;
                    existingLeaveRequest.Comment = leaveRequest.Comment;

                    _context.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool UpdateRequest(ApprovalRequest approvalRequest)
        {
            throw new NotImplementedException();
        }
    }
}
