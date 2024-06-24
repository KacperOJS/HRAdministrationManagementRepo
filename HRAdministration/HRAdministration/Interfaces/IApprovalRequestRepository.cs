using HRAdministration.Models;

namespace HRAdministration.Interfaces
{
    public interface IApprovalRequestRepository
    {
        ICollection<ApprovalRequest> GetAllApprovalRequests(); 
        ApprovalRequest GetApprovalRequest(int id);
        bool UpdateRequest(ApprovalRequest approvalRequest);
        bool DeleteRequest(ApprovalRequest approvalRequest);

        bool Save();
    }
}
