using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HRAdministration.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ApprovalRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Approver = table.Column<int>(type: "int", nullable: false),
                    LeaveRequest = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApprovalRequests", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Subdivision = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Position = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    PeoplePartner = table.Column<int>(type: "int", nullable: false),
                    OutOfOfficeBalance = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Photo = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LeaveRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Employee = table.Column<int>(type: "int", nullable: false),
                    AbsenceReason = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeaveRequests", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ProjectManager = table.Column<int>(type: "int", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "ApprovalRequests",
                columns: new[] { "Id", "Approver", "Comment", "LeaveRequest", "Status" },
                values: new object[,]
                {
                    { 1, 6, "", 1, "New" },
                    { 2, 6, "", 2, "New" },
                    { 3, 7, "", 3, "New" },
                    { 4, 7, "", 4, "New" },
                    { 5, 8, "", 5, "New" },
                    { 6, 9, "", 6, "New" },
                    { 7, 10, "", 7, "New" },
                    { 8, 11, "", 8, "New" },
                    { 9, 12, "", 9, "New" },
                    { 10, 13, "", 10, "New" }
                });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "Id", "FullName", "OutOfOfficeBalance", "PeoplePartner", "Photo", "Position", "Status", "Subdivision" },
                values: new object[,]
                {
                    { 1, "John Doe", 20m, 2, "john_doe_photo.jpg", "Developer", "Active", "IT Department" },
                    { 2, "Chris Adams", 15m, 0, "chris_adams_photo.jpg", "Marketing Specialist", "Active", "Marketing" },
                    { 3, "Sarah Smith", 18m, 0, "sarah_smith_photo.jpg", "Financial Analyst", "Active", "Finance Department" },
                    { 4, "Joseph Choo", 25m, 0, "joseph_choo_photo.jpg", "Operations Manager", "Active", "Operations" },
                    { 5, "Steve Harding", 22m, 0, "steve_harding_photo.jpg", "Senior Engineer", "Active", "Research and Development" },
                    { 6, "Laura Croft", 17m, 0, "laura_croft_photo.jpg", "HR Specialist", "Active", "HR Department" },
                    { 7, "Michael Jones", 19m, 0, "michael_jones_photo.jpg", "System Administrator", "Active", "IT Department" },
                    { 8, "James Bond", 16m, 0, "james_bond_photo.jpg", "Security Officer", "Active", "Security" },
                    { 9, "Haley Whiting", 14m, 0, "haley_whiting_photo.jpg", "Customer Support Specialist", "Active", "Customer Service" },
                    { 10, "Tim Thomas", 21m, 0, "tim_thomas_photo.jpg", "Sales Executive", "Active", "Sales Department" },
                    { 11, "Kacper Odziemczyk", 23m, 0, "kacper_odziemczyk_photo.jpg", "Software Engineer", "Active", "IT Department" },
                    { 12, "Michal Grzechowski", 18m, 0, "michal_grzechowski_photo.jpg", "Marketing Manager", "Active", "Marketing" },
                    { 13, "Katarzyna Bielik", 16m, 0, "katarzyna_bielik_photo.jpg", "Accountant", "Active", "Finance Department" }
                });

            migrationBuilder.InsertData(
                table: "LeaveRequests",
                columns: new[] { "Id", "AbsenceReason", "Comment", "Employee", "EndDate", "StartDate", "Status" },
                values: new object[,]
                {
                    { 1, "Vacation", "", 1, new DateTime(2023, 7, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2023, 7, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "New" },
                    { 2, "Medical", "", 2, new DateTime(2023, 8, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2023, 8, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "New" },
                    { 3, "Family Leave", "", 3, new DateTime(2023, 9, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2023, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "New" },
                    { 4, "Personal Time Off", "", 4, new DateTime(2023, 10, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2023, 10, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "New" },
                    { 5, "Sick Leave", "", 5, new DateTime(2023, 11, 8, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2023, 11, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), "New" },
                    { 6, "Maternity Leave", "", 6, new DateTime(2024, 1, 10, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2023, 12, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "New" },
                    { 7, "Training Leave", "", 7, new DateTime(2024, 2, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2024, 2, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "New" },
                    { 8, "Personal Development", "", 8, new DateTime(2024, 3, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2024, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "New" },
                    { 9, "Study Leave", "", 9, new DateTime(2024, 4, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2024, 4, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "New" },
                    { 10, "Remote Work", "", 10, new DateTime(2024, 5, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2024, 5, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "New" }
                });

            migrationBuilder.InsertData(
                table: "Projects",
                columns: new[] { "Id", "Comment", "EndDate", "ProjectManager", "ProjectType", "StartDate", "Status" },
                values: new object[,]
                {
                    { 1, "", new DateTime(2023, 12, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, "Software Development", new DateTime(2023, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Active" },
                    { 2, "", null, 2, "Marketing Campaign", new DateTime(2023, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Active" },
                    { 3, "", new DateTime(2023, 3, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), 3, "Training Program", new DateTime(2023, 3, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Active" },
                    { 4, "", new DateTime(2023, 4, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 4, "Product Launch", new DateTime(2023, 4, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Active" },
                    { 5, "", new DateTime(2023, 5, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), 5, "Client Onboarding", new DateTime(2023, 5, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Active" },
                    { 6, "", new DateTime(2024, 6, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 6, "Event Management", new DateTime(2024, 6, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Active" },
                    { 7, "", new DateTime(2024, 7, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), 7, "Product Enhancement", new DateTime(2024, 7, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Active" },
                    { 8, "", new DateTime(2024, 8, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), 8, "Infrastructure Upgrade", new DateTime(2024, 8, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Active" },
                    { 9, "", new DateTime(2024, 9, 30, 0, 0, 0, 0, DateTimeKind.Unspecified), 9, "Market Expansion", new DateTime(2024, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Active" },
                    { 10, "", new DateTime(2024, 10, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), 10, "Customer Experience Improvement", new DateTime(2024, 10, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Active" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApprovalRequests");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "LeaveRequests");

            migrationBuilder.DropTable(
                name: "Projects");
        }
    }
}
