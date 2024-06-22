import mysql from "mysql";

const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "outofoffice"
});

dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + dbConnection.threadId);
});

// Endpoint to get all employees
export const getAllEmployees = (req, res) => {
	dbConnection.query('SELECT * FROM employees', (err, results) => {
	  if (err) {
		console.error('Error fetching employees: ' + err.stack);
		res.status(500).json({ error: 'Error fetching employees' });
		return;
	  }
	  res.status(200).json(results);
	});
  };
  
  // Endpoint to get an employee by ID
  export const getEmployeeById = (req, res) => {
	const { id } = req.params;
	dbConnection.query('SELECT * FROM employees WHERE id = ?', [id], (err, results) => {
	  if (err) {
		console.error('Error fetching employee: ' + err.stack);
		res.status(500).json({ error: 'Error fetching employee' });
		return;
	  }
	  if (results.length === 0) {
		res.status(404).json({ message: 'Employee not found' });
		return;
	  }
	  res.status(200).json(results[0]);
	});
  };
  