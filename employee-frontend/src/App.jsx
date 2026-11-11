import React, { useEffect, useState } from "react";
import "./App.css";

import Login from "./Login";
import InsertEmployee from "./InsertEmployee";
import EditEmployee from "./EditEmployee";
import GetAllEmployees from "./GetAllEmployees";
import GetEmployeeById from "./GetEmployeeById";

import {
  createEmployee,
  getEmployeeById,
  getAllEmployees,
  updateEmployee,
  deleteEmployee
} from "./EmployeeService";

const emptyEmployee = {
  eName: "",
  eLastName: "",
  age: "",
  salary: "",
  dept: "",
  phone: ""
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({ ...emptyEmployee });
  const [editingId, setEditingId] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [searchedEmployee, setSearchedEmployee] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const response = await getAllEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error("Unable to load employees:", error);
      setMessage("Unable to connect to the backend. Please check Spring Boot and MySQL.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadEmployees();
    }
  }, [isLoggedIn]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee((previousEmployee) => ({
      ...previousEmployee,
      [name]: value
    }));
  };

  const clearForm = () => {
    setEmployee({ ...emptyEmployee });
    setEditingId(null);
  };

  const prepareEmployeeData = () => ({
    eName: employee.eName.trim(),
    eLastName: employee.eLastName.trim(),
    age: Number(employee.age),
    salary: Number(employee.salary),
    dept: employee.dept.trim(),
    phone: Number(employee.phone)
  });

  const handleInsertEmployee = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await createEmployee(prepareEmployeeData());
      setMessage("Employee inserted successfully.");
      clearForm();
      setActivePage("employees");
      await loadEmployees();
    } catch (error) {
      console.error("Unable to insert employee:", error);
      setMessage("Failed to insert employee. Please check the entered details.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditEmployee = (selectedEmployee) => {
    setEmployee({
      eName: selectedEmployee.eName || "",
      eLastName: selectedEmployee.eLastName || "",
      age: selectedEmployee.age ?? "",
      salary: selectedEmployee.salary ?? "",
      dept: selectedEmployee.dept || "",
      phone: selectedEmployee.phone ?? ""
    });
    setEditingId(selectedEmployee.empId);
    setActivePage("edit");
  };

  const handleUpdateEmployee = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await updateEmployee(editingId, prepareEmployeeData());
      setMessage("Employee updated successfully.");
      clearForm();
      setActivePage("employees");
      await loadEmployees();
    } catch (error) {
      console.error("Unable to update employee:", error);
      setMessage("Failed to update employee.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (id) => {
    const confirmed = window.confirm(`Do you want to delete employee #${id}?`);
    if (!confirmed) return;

    try {
      await deleteEmployee(id);
      setMessage("Employee deleted successfully.");
      await loadEmployees();
    } catch (error) {
      console.error("Unable to delete employee:", error);
      setMessage("Failed to delete employee.");
    }
  };

  const handleFindEmployee = async (event) => {
    event.preventDefault();

    try {
      const response = await getEmployeeById(searchId);
      setSearchedEmployee(response.data);
      setMessage("");
    } catch (error) {
      console.error("Employee not found:", error);
      setSearchedEmployee(null);
      setMessage(`Employee with ID ${searchId} was not found.`);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setActivePage("dashboard");
    clearForm();
    setSearchedEmployee(null);
    setMessage("");
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const departmentCount = new Set(employees.map((item) => item.dept).filter(Boolean)).size;
  const totalSalary = employees.reduce((total, item) => total + Number(item.salary || 0), 0);

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-mark">EP</span>
          <div>
            <strong>Employee Portal</strong>
            <small>Management workspace</small>
          </div>
        </div>

        <div className="nav-label">WORKSPACE</div>
        <button className={`nav-link ${activePage === "dashboard" ? "active" : ""}`} onClick={() => setActivePage("dashboard")}>
          <span className="nav-icon">▦</span> Dashboard
        </button>
        <button className={`nav-link ${activePage === "insert" ? "active" : ""}`} onClick={() => { clearForm(); setActivePage("insert"); }}>
          <span className="nav-icon">＋</span> Insert Employee
        </button>
        <button className={`nav-link ${activePage === "employees" ? "active" : ""}`} onClick={() => setActivePage("employees")}>
          <span className="nav-icon">♙</span> Get All Employees
        </button>
        <button className={`nav-link ${activePage === "find" ? "active" : ""}`} onClick={() => setActivePage("find")}>
          <span className="nav-icon">⌕</span> Get Employee By ID
        </button>

        <div className="sidebar-bottom">
          <div className="profile-mini">
            <span className="profile-avatar">A</span>
            <span><strong>Administrator</strong><small>Admin account</small></span>
          </div>
          <button className="logout-button" onClick={logout}>↪ Sign out</button>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div>
            <span className="eyebrow">EMPLOYEE MANAGEMENT SYSTEM</span>
            <h1>{pageTitle(activePage)}</h1>
          </div>
          <div className="topbar-right">
            <span className="online-indicator"><i /> System online</span>
            <span className="topbar-avatar">A</span>
          </div>
        </header>

        <div className="page-content">
          {message && (
            <div className="message-box">
              <span>{message}</span>
              <button onClick={() => setMessage("")} aria-label="Close message">×</button>
            </div>
          )}

          {activePage === "dashboard" && (
            <>
              <section className="welcome-panel">
                <div>
                  <span className="eyebrow">OVERVIEW</span>
                  <h2>Welcome back, Admin</h2>
                  <p>Here is what is happening with your workforce today.</p>
                </div>
                <button className="button button-white" onClick={() => setActivePage("insert")}>＋ Add employee</button>
              </section>

              <section className="stats-grid">
                <div className="stat-card">
                  <span className="stat-symbol blue-symbol">♙</span>
                  <div><p>Total employees</p><h2>{employees.length}</h2><small>Employee records</small></div>
                </div>
                <div className="stat-card">
                  <span className="stat-symbol purple-symbol">▦</span>
                  <div><p>Departments</p><h2>{departmentCount}</h2><small>Unique departments</small></div>
                </div>
                <div className="stat-card">
                  <span className="stat-symbol green-symbol">₹</span>
                  <div><p>Total payroll</p><h2>₹{totalSalary.toLocaleString("en-IN")}</h2><small>Monthly salary total</small></div>
                </div>
              </section>

              <GetAllEmployees
                employees={employees.slice(0, 5)}
                loading={loading}
                onEdit={handleEditEmployee}
                onDelete={handleDeleteEmployee}
                searchText=""
                onSearchChange={() => {}}
              />
              <div className="dashboard-footer">
                <span>Recent employee records</span>
                <button className="text-button edit-text" onClick={() => setActivePage("employees")}>View all employees →</button>
              </div>
            </>
          )}

          {activePage === "insert" && (
            <InsertEmployee
              employee={employee}
              onChange={handleChange}
              onSubmit={handleInsertEmployee}
              onClear={clearForm}
              loading={loading}
            />
          )}

          {activePage === "edit" && editingId !== null && (
            <EditEmployee
              employee={{ ...employee, empId: editingId }}
              onChange={handleChange}
              onSubmit={handleUpdateEmployee}
              onCancel={() => { clearForm(); setActivePage("employees"); }}
              loading={loading}
            />
          )}

          {activePage === "employees" && (
            <GetAllEmployees
              employees={employees}
              loading={loading}
              onEdit={handleEditEmployee}
              onDelete={handleDeleteEmployee}
              searchText={searchText}
              onSearchChange={setSearchText}
            />
          )}

          {activePage === "find" && (
            <GetEmployeeById
              searchId={searchId}
              onSearchChange={setSearchId}
              onSearch={handleFindEmployee}
              employee={searchedEmployee}
            />
          )}
        </div>
      </main>
    </div>
  );
}

function pageTitle(page) {
  const titles = {
    dashboard: "Dashboard",
    insert: "Insert Employee",
    edit: "Edit Employee",
    employees: "All Employees",
    find: "Find Employee"
  };
  return titles[page] || "Dashboard";
}

export default App;
