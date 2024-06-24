# Project Name

## Overview

This project consists of a frontend built with Next.js and a backend built with C# and Swagger UI. The frontend communicates with the backend to perform various CRUD operations. The backend interacts with a SQL Server database.

## Prerequisites

Ensure you have the following installed:
- Node.js
- npm or yarn
- .NET SDK
- SQL Server Management Studio (SSMS)
- A code editor (e.g., Visual Studio Code or Visual Studio)

## Getting Started

### Step 1: Set Up the Database

1. **Import the Schema to SSMS:**
   - Open SSMS and connect to your SQL Server instance.
   - In the `frontend` folder of your project, locate the `schema` folder.
   - Right-click on your database, and select `Tasks -> Import Data...`
   - Follow the wizard to import the schema files into your database.

2. **Update Connection Strings:**
   - **Frontend:** In the `frontend` project, update the connection string in the `.env.local` or `config.js` file to point to your local or production database.
   - **Backend:** In the `backend` project, update the connection string in the `appsettings.json` file under the `ConnectionStrings` section.
