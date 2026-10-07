import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const API = "http://localhost:9346/employee";

  // All employees
  const [employees, setEmployees] = useState([]);

  // Form data
  const [employee, setEmployee] = useState({
    eName: "",
    eLastName: "",
    age: "",
    salary: "",
    dept: "",
    phone: ""
  });

  // Search ID
  const [searchId, setSearchId] = useState("");

  // Selected employee
  const [searchedEmployee, setSearchedEmployee] = useState(null);

  // Update mode
  const [editingId, setEditingId] = useState(null);

  // Message
  const [message, setMessage] = useState("");

  // Loading
  const [loading, setLoading] = useState(false);


  // =========================
  // GET ALL EMPLOYEES
  // =========================
  const getAllEmployees = async () => {

    try {

      setLoading(true);

      const response = await axios.get(`${API}/getAllEmp`);

      setEmployees(response.data);

    } catch (error) {

      console.log(error);

      setMessage("❌ Unable to fetch employees");

    } finally {

      setLoading(false);

    }
  };


  // =========================
  // PAGE LOAD
  // =========================
  useEffect(() => {

    getAllEmployees();

  }, []);


  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {

    const { name, value } = e.target;

    setEmployee({
      ...employee,
      [name]: value
    });

  };


  // =========================
  // CREATE EMPLOYEE
  // =========================
  const createEmployee = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        `${API}/createEmployee`,
        {
          eName: employee.eName,
          eLastName: employee.eLastName,
          age: Number(employee.age),
          salary: Number(employee.salary),
          dept: employee.dept,
          phone: Number(employee.phone)
        }
      );

      console.log(response.data);

      setMessage("✅ Employee added successfully!");

      clearForm();

      getAllEmployees();

    } catch (error) {

      console.log(error);

      setMessage("❌ Failed to add employee");

    }

  };


  // =========================
  // GET EMPLOYEE BY ID
  // =========================
  const getEmployeeById = async () => {

    if (!searchId) {

      setMessage("⚠️ Please enter Employee ID");

      return;

    }

    try {

      const response = await axios.get(
        `${API}/createEmployee/${searchId}`
      );

      setSearchedEmployee(response.data);

      setMessage("✅ Employee found");

    } catch (error) {

      console.log(error);

      setSearchedEmployee(null);

      setMessage("❌ Employee not found");

    }

  };


  // =========================
  // DELETE EMPLOYEE
  // =========================
  const deleteEmployee = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await axios.delete(`${API}/delEmp/${id}`);

      setMessage("🗑️ Employee deleted successfully!");

      getAllEmployees();

    } catch (error) {

      console.log(error);

      setMessage("❌ Failed to delete employee");

    }

  };


  // =========================
  // START UPDATE
  // =========================
  const startEdit = (emp) => {

    setEditingId(emp.empId);

    setEmployee({
      eName: emp.eName,
      eLastName: emp.eLastName,
      age: emp.age,
      salary: emp.salary,
      dept: emp.dept,
      phone: emp.phone
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  // =========================
  // UPDATE EMPLOYEE
  // =========================
  const updateEmployee = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.put(
        `${API}/updateEmp/${editingId}`,
        {
          eName: employee.eName,
          eLastName: employee.eLastName,
          age: Number(employee.age),
          salary: Number(employee.salary),
          dept: employee.dept,
          phone: Number(employee.phone)
        }
      );

      console.log(response.data);

      setMessage("✅ Employee updated successfully!");

      setEditingId(null);

      clearForm();

      getAllEmployees();

    } catch (error) {

      console.log(error);

      setMessage("❌ Failed to update employee");

    }

  };


  // =========================
  // CLEAR FORM
  // =========================
  const clearForm = () => {

    setEmployee({
      eName: "",
      eLastName: "",
      age: "",
      salary: "",
      dept: "",
      phone: ""
    });

    setEditingId(null);

  };


  // =========================
  // CANCEL UPDATE
  // =========================
  const cancelEdit = () => {

    clearForm();

    setMessage("Update cancelled");

  };


  return (

    <div className="app">

      {/* ================= HEADER ================= */}

      <header className="top-header">

        <div className="brand-section">

          <div className="brand-icon">
            EM
          </div>

          <div>
            <h1>Employee Management</h1>

            <p>
              Manage your workforce with ease
            </p>
          </div>

        </div>

        <div className="header-status">
          <span className="status-dot"></span>
          System Online
        </div>

      </header>


      <main className="main-container">


        {/* ================= MESSAGE ================= */}

        {message && (

          <div className="message-box">

            <span>{message}</span>

            <button
              onClick={() => setMessage("")}
            >
              ×
            </button>

          </div>

        )}


        {/* ================= STAT CARDS ================= */}

        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon blue">
              👥
            </div>

            <div>
              <p>Total Employees</p>
              <h2>{employees.length}</h2>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon green">
              💼
            </div>

            <div>
              <p>Departments</p>

              <h2>
                {
                  new Set(
                    employees.map(emp => emp.dept)
                  ).size
                }
              </h2>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon orange">
              💰
            </div>

            <div>
              <p>Management</p>
              <h2>CRUD</h2>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon purple">
              ⚡
            </div>

            <div>
              <p>Backend</p>
              <h2>Spring</h2>
            </div>

          </div>

        </section>


        {/* ================= FORM ================= */}

        <section className="panel">

          <div className="panel-heading">

            <div>

              <span className="section-label">
                {editingId ? "EDIT EMPLOYEE" : "NEW EMPLOYEE"}
              </span>

              <h2>
                {editingId
                  ? `Update Employee #${editingId}`
                  : "Add Employee"}
              </h2>

            </div>

            {editingId && (

              <button
                className="cancel-button"
                onClick={cancelEdit}
              >
                Cancel Update
              </button>

            )}

          </div>


          <form
            onSubmit={
              editingId
                ? updateEmployee
                : createEmployee
            }
            className="employee-form"
          >


            {/* FIRST NAME */}

            <div className="input-group">

              <label>First Name</label>

              <input
                type="text"
                name="eName"
                placeholder="Enter first name"
                value={employee.eName}
                onChange={handleChange}
                required
              />

            </div>


            {/* LAST NAME */}

            <div className="input-group">

              <label>Last Name</label>

              <input
                type="text"
                name="eLastName"
                placeholder="Enter last name"
                value={employee.eLastName}
                onChange={handleChange}
                required
              />

            </div>


            {/* AGE */}

            <div className="input-group">

              <label>Age</label>

              <input
                type="number"
                name="age"
                placeholder="Enter age"
                value={employee.age}
                onChange={handleChange}
                required
              />

            </div>


            {/* SALARY */}

            <div className="input-group">

              <label>Salary</label>

              <input
                type="number"
                name="salary"
                placeholder="Enter salary"
                value={employee.salary}
                onChange={handleChange}
                required
              />

            </div>


            {/* DEPARTMENT */}

            <div className="input-group">

              <label>Department</label>

              <input
                type="text"
                name="dept"
                placeholder="e.g. IT, HR, Finance"
                value={employee.dept}
                onChange={handleChange}
                required
              />

            </div>


            {/* PHONE */}

            <div className="input-group">

              <label>Phone</label>

              <input
                type="number"
                name="phone"
                placeholder="Enter phone number"
                value={employee.phone}
                onChange={handleChange}
                required
              />

            </div>


            {/* BUTTON */}

            <div className="form-actions">

              <button
                type="button"
                className="clear-button"
                onClick={clearForm}
              >
                Clear
              </button>

              <button
                type="submit"
                className="primary-button"
              >

                {editingId
                  ? "Update Employee"
                  : "Add Employee"}

              </button>

            </div>

          </form>

        </section>


        {/* ================= SEARCH ================= */}

        <section className="search-panel">

          <div className="search-title">

            <span className="search-icon">
              🔎
            </span>

            <div>

              <h2>Find Employee</h2>

              <p>
                Search an employee using their ID
              </p>

            </div>

          </div>


          <div className="search-area">

            <input
              type="number"
              placeholder="Enter Employee ID"
              value={searchId}
              onChange={(e) =>
                setSearchId(e.target.value)
              }
            />

            <button
              onClick={getEmployeeById}
            >
              Search
            </button>

          </div>


          {/* SEARCH RESULT */}

          {searchedEmployee && (

            <div className="search-result">

              <div>
                <small>EMPLOYEE ID</small>
                <strong>
                  #{searchedEmployee.empId}
                </strong>
              </div>

              <div>
                <small>NAME</small>
                <strong>
                  {searchedEmployee.eName}{" "}
                  {searchedEmployee.eLastName}
                </strong>
              </div>

              <div>
                <small>DEPARTMENT</small>
                <strong>
                  {searchedEmployee.dept}
                </strong>
              </div>

              <div>
                <small>SALARY</small>
                <strong>
                  ₹{searchedEmployee.salary}
                </strong>
              </div>

            </div>

          )}

        </section>


        {/* ================= EMPLOYEE TABLE ================= */}

        <section className="panel employee-panel">

          <div className="table-heading">

            <div>

              <span className="section-label">
                EMPLOYEE DIRECTORY
              </span>

              <h2>All Employees</h2>

            </div>


            <button
              className="refresh-button"
              onClick={getAllEmployees}
            >
              ↻ Refresh
            </button>

          </div>


          {loading ? (

            <div className="loading">
              Loading employees...
            </div>

          ) : employees.length === 0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                📋
              </div>

              <h3>No Employees Found</h3>

              <p>
                Add your first employee using the form above.
              </p>

            </div>

          ) : (

            <div className="table-wrapper">

              <table>

                <thead>

                  <tr>

                    <th>ID</th>

                    <th>Employee</th>

                    <th>Age</th>

                    <th>Department</th>

                    <th>Salary</th>

                    <th>Phone</th>

                    <th>Actions</th>

                  </tr>

                </thead>


                <tbody>

                  {employees.map((emp) => (

                    <tr key={emp.empId}>

                      <td>

                        <span className="employee-id">
                          #{emp.empId}
                        </span>

                      </td>


                      <td>

                        <div className="employee-name">

                          <div className="avatar">
                            {emp.eName
                              ? emp.eName.charAt(0).toUpperCase()
                              : "E"}
                          </div>

                          <div>

                            <strong>
                              {emp.eName}{" "}
                              {emp.eLastName}
                            </strong>

                            <small>
                              Employee
                            </small>

                          </div>

                        </div>

                      </td>


                      <td>
                        {emp.age}
                      </td>


                      <td>

                        <span className="department-badge">
                          {emp.dept}
                        </span>

                      </td>


                      <td>

                        <strong className="salary">
                          ₹{emp.salary}
                        </strong>

                      </td>


                      <td>
                        {emp.phone}
                      </td>


                      <td>

                        <div className="action-buttons">

                          <button
                            className="edit-button"
                            onClick={() =>
                              startEdit(emp)
                            }
                          >
                            Edit
                          </button>


                          <button
                            className="delete-button"
                            onClick={() =>
                              deleteEmployee(emp.empId)
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </section>


        {/* ================= FOOTER ================= */}

        <footer>

          <p>
            Employee Management System
          </p>

          <span>
            React + Axios • Spring Boot • MySQL
          </span>

        </footer>

      </main>

    </div>

  );

}

export default App;