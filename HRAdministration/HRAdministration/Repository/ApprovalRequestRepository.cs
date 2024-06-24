using HRAdministration.Data;
using HRAdministration.Interfaces;
using HRAdministration.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace HRAdministration.Repository
{
    public class ApprovalRequestRepository : IApprovalRequestRepository
    {
        private readonly DataContext _context;

        public ApprovalRequestRepository(DataContext context)
        {
            _context = context;
        }

        public bool DeleteRequest(ApprovalRequest approvalRequest)
        {
            throw new NotImplementedException();
        }

        public ICollection<ApprovalRequest> GetAllApprovalRequests()
        {
            return _context.ApprovalRequests.OrderBy(x => x.Id).ToList();
        }

        public ApprovalRequest GetApprovalRequest(int id)
        {
            return _context.ApprovalRequests.FirstOrDefault(ar => ar.Id == id);
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

        public bool UpdateRequest(ApprovalRequest approvalRequest)
        {
            _context.ApprovalRequests.Update(approvalRequest);
            return Save();
        }
    }
}
