using HRAdministration.Models;

namespace HRAdministration.Interfaces
{
    public interface ILeaveRequestRepository
    {
        ICollection<LeaveRequest> GetAllLeaveRequests();
        LeaveRequest GetLeaveRequest(int id);
        bool UpdateRequest(LeaveRequest approvalRequest);
        bool DeleteRequest(LeaveRequest approvalRequest);

        bool Save();
    }
}
