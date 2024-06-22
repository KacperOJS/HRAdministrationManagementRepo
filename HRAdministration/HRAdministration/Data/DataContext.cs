using HRAdministration.Models;  // Include your model namespace
using Microsoft.EntityFrameworkCore;
using System;

namespace HRAdministration.Data
{
    public class DataContext : DbContext
    {
        // Constructor to initialize DbContextOptions
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        // DbSet properties for each entity
        public DbSet<Project> Projects { get; set; }
        public DbSet<LeaveRequest> LeaveRequests { get; set; }
        public DbSet<ApprovalRequest> ApprovalRequests { get; set; }
        public DbSet<Employee> Employees { get; set; }

        // Override to configure model
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);  // Call base method for any base configuration

            // Seed data for Employees table
            modelBuilder.Entity<Employee>().HasData(
                new Employee { Id = 1, FullName = "John Doe", Subdivision = "IT Department", Position = "Developer", Status = "Active", PeoplePartner = 2, OutOfOfficeBalance = 20, Photo = "john_doe_photo.jpg" },
                new Employee { Id = 2, FullName = "Chris Adams", Subdivision = "Marketing", Position = "Marketing Specialist", Status = "Active", PeoplePartner = 0, OutOfOfficeBalance = 15, Photo = "chris_adams_photo.jpg" },
                new Employee { Id = 3, FullName = "Sarah Smith", Subdivision = "Finance Department", Position = "Financial Analyst", Status = "Active", PeoplePartner = 0, OutOfOfficeBalance = 18, Photo = "sarah_smith_photo.jpg" },
                new Employee { Id = 4, FullName = "Joseph Choo", Subdivision = "Operations", Position = "Operations Manager", Status = "Active", PeoplePartner = 0, OutOfOfficeBalance = 25, Photo = "joseph_choo_photo.jpg" },
                new Employee { Id = 5, FullName = "Steve Harding", Subdivision = "Research and Development", Position = "Senior Engineer", Status = "Active", PeoplePartner = 0, OutOfOfficeBalance = 22, Photo = "steve_harding_photo.jpg" },
                new Employee { Id = 6, FullName = "Laura Croft", Subdivision = "HR Department", Position = "HR Specialist", Status = "Active", PeoplePartner = 0, OutOfOfficeBalance = 17, Photo = "laura_croft_photo.jpg" },
                new Employee { Id = 7, FullName = "Michael Jones", Subdivision = "IT Department", Position = "System Administrator", Status = "Active", PeoplePartner = 0, OutOfOfficeBalance = 19, Photo = "michael_jones_photo.jpg" },
                new Employee { Id = 8, FullName = "James Bond", Subdivision = "Security", Position = "Security Officer", Status = "Active", PeoplePartner = 0, OutOfOfficeBalance = 16, Photo = "james_bond_photo.jpg" },
                new Employee { Id = 9, FullName = "Haley Whiting", Subdivision = "Customer Service", Position = "Customer Support Specialist", Status = "Active", PeoplePartner = 0, OutOfOfficeBalance = 14, Photo = "haley_whiting_photo.jpg" },
                new Employee { Id = 10, FullName = "Tim Thomas", Subdivision = "Sales Department", Position = "Sales Executive", Status = "Active", PeoplePartner = 0, OutOfOfficeBalance = 21, Photo = "tim_thomas_photo.jpg" },
                new Employee { Id = 11, FullName = "Kacper Odziemczyk", Subdivision = "IT Department", Position = "Software Engineer", Status = "Active", PeoplePartner = 0, OutOfOfficeBalance = 23, Photo = "kacper_odziemczyk_photo.jpg" },
                new Employee { Id = 12, FullName = "Michal Grzechowski", Subdivision = "Marketing", Position = "Marketing Manager", Status = "Active", PeoplePartner = 0, OutOfOfficeBalance = 18, Photo = "michal_grzechowski_photo.jpg" },
                new Employee { Id = 13, FullName = "Katarzyna Bielik", Subdivision = "Finance Department", Position = "Accountant", Status = "Active", PeoplePartner = 0, OutOfOfficeBalance = 16, Photo = "katarzyna_bielik_photo.jpg" }
            );

            // Seed data for LeaveRequests table
            modelBuilder.Entity<LeaveRequest>().HasData(
                new LeaveRequest { Id = 1, Employee = 1, AbsenceReason = "Vacation", StartDate = new DateTime(2023, 7, 1), EndDate = new DateTime(2023, 7, 10), Status = "New", Comment = "" },
                new LeaveRequest { Id = 2, Employee = 2, AbsenceReason = "Medical", StartDate = new DateTime(2023, 8, 15), EndDate = new DateTime(2023, 8, 20), Status = "New", Comment = "" },
                new LeaveRequest { Id = 3, Employee = 3, AbsenceReason = "Family Leave", StartDate = new DateTime(2023, 9, 1), EndDate = new DateTime(2023, 9, 10), Status = "New", Comment = "" },
                new LeaveRequest { Id = 4, Employee = 4, AbsenceReason = "Personal Time Off", StartDate = new DateTime(2023, 10, 15), EndDate = new DateTime(2023, 10, 18), Status = "New" , Comment = "" },
                new LeaveRequest { Id = 5, Employee = 5, AbsenceReason = "Sick Leave", StartDate = new DateTime(2023, 11, 5), EndDate = new DateTime(2023, 11, 8), Status = "New", Comment = "" },
                new LeaveRequest { Id = 6, Employee = 6, AbsenceReason = "Maternity Leave", StartDate = new DateTime(2023, 12, 1), EndDate = new DateTime(2024, 1, 10), Status = "New", Comment = "" },
                new LeaveRequest { Id = 7, Employee = 7, AbsenceReason = "Training Leave", StartDate = new DateTime(2024, 2, 15), EndDate = new DateTime(2024, 2, 20), Status = "New", Comment = "" },
                new LeaveRequest { Id = 8, Employee = 8, AbsenceReason = "Personal Development", StartDate = new DateTime(2024, 3, 1), EndDate = new DateTime(2024, 3, 5), Status = "New", Comment = "" },
                new LeaveRequest { Id = 9, Employee = 9, AbsenceReason = "Study Leave", StartDate = new DateTime(2024, 4, 15), EndDate = new DateTime(2024, 4, 20), Status = "New", Comment = "" },
                new LeaveRequest { Id = 10, Employee = 10, AbsenceReason = "Remote Work", StartDate = new DateTime(2024, 5, 1), EndDate = new DateTime(2024, 5, 5), Status = "New", Comment = "" }
            );

            // Seed data for ApprovalRequests table
            modelBuilder.Entity<ApprovalRequest>().HasData(
                new ApprovalRequest { Id = 1, Approver = 6, LeaveRequest = 1, Status = "New", Comment = "" }, 
                new ApprovalRequest { Id = 2, Approver = 6, LeaveRequest = 2, Status = "New", Comment = "" },  
                new ApprovalRequest { Id = 3, Approver = 7, LeaveRequest = 3, Status = "New", Comment = "" },  
                new ApprovalRequest { Id = 4, Approver = 7, LeaveRequest = 4, Status = "New", Comment = "" },  
                new ApprovalRequest { Id = 5, Approver = 8, LeaveRequest = 5, Status = "New", Comment = "" },  
                new ApprovalRequest { Id = 6, Approver = 9, LeaveRequest = 6, Status = "New", Comment = "" },  
                new ApprovalRequest { Id = 7, Approver = 10, LeaveRequest = 7, Status = "New", Comment = "" }, 
                new ApprovalRequest { Id = 8, Approver = 11, LeaveRequest = 8, Status = "New", Comment = "" }, 
                new ApprovalRequest { Id = 9, Approver = 12, LeaveRequest = 9, Status = "New", Comment = "" }, 
                new ApprovalRequest { Id = 10, Approver = 13, LeaveRequest = 10, Status = "New", Comment = "" } 
            );

            // Seed data for Projects table
            modelBuilder.Entity<Project>().HasData(
                new Project { Id = 1, ProjectType = "Software Development", StartDate = new DateTime(2023, 1, 1), EndDate = new DateTime(2023, 12, 31), ProjectManager = 1, Status = "Active", Comment = "" },
                new Project { Id = 2, ProjectType = "Marketing Campaign", StartDate = new DateTime(2023, 2, 1), ProjectManager = 2, Status = "Active" , Comment = "" },
                new Project { Id = 3, ProjectType = "Training Program", StartDate = new DateTime(2023, 3, 1), EndDate = new DateTime(2023, 3, 31), ProjectManager = 3, Status = "Active" , Comment = "" },
                new Project { Id = 4, ProjectType = "Product Launch", StartDate = new DateTime(2023, 4, 1), EndDate = new DateTime(2023, 4, 30), ProjectManager = 4, Status = "Active" , Comment = "" },
                new Project { Id = 5, ProjectType = "Client Onboarding", StartDate = new DateTime(2023, 5, 1), EndDate = new DateTime(2023, 5, 31), ProjectManager = 5, Status = "Active" , Comment = "" },
                new Project { Id = 6, ProjectType = "Event Management", StartDate = new DateTime(2024, 6, 1), EndDate = new DateTime(2024, 6, 30), ProjectManager = 6, Status = "Active" , Comment = ""  },
                new Project { Id = 7, ProjectType = "Product Enhancement", StartDate = new DateTime(2024, 7, 1), EndDate = new DateTime(2024, 7, 31), ProjectManager = 7, Status = "Active" , Comment = ""  },
                new Project { Id = 8, ProjectType = "Infrastructure Upgrade", StartDate = new DateTime(2024, 8, 1), EndDate = new DateTime(2024, 8, 31), ProjectManager = 8, Status = "Active" , Comment = ""  },
                new Project { Id = 9, ProjectType = "Market Expansion", StartDate = new DateTime(2024, 9, 1), EndDate = new DateTime(2024, 9, 30), ProjectManager = 9, Status = "Active" , Comment = "" },
                new Project { Id = 10, ProjectType = "Customer Experience Improvement", StartDate = new DateTime(2024, 10, 1), EndDate = new DateTime(2024, 10, 31), ProjectManager = 10, Status = "Active" , Comment = ""}
            );
        }
    }
}
