import React from "react";

function GetAllEmployees({ employees, loading, onEdit, onDelete, searchText, onSearchChange }) {
  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.eName} ${employee.eLastName}`.toLowerCase();
    return (
      fullName.includes(searchText.toLowerCase()) ||
      String(employee.empId).includes(searchText) ||
      (employee.dept || "").toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <section className="content-card">
      <div className="section-heading employee-list-heading">
        <div>
          <span className="eyebrow">YOUR TEAM</span>
          <h2>Get All Employees</h2>
          <p className="muted">View, edit or remove employee records.</p>
        </div>
        <input
          className="search-input"
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search name, ID or department"
          aria-label="Search employees"
        />
      </div>

      {loading ? (
        <div className="empty-state">Loading employees...</div>
      ) : filteredEmployees.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">▤</div>
          <h3>No employees found</h3>
          <p>Try another search or insert your first employee.</p>
        </div>
      ) : (
        <div className="table-scroll">
          <table className="employee-table">
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
              {filteredEmployees.map((employee) => (
                <tr key={employee.empId}>
                  <td className="id-cell">#{employee.empId}</td>
                  <td>
                    <div className="employee-cell">
                      <span className="avatar">{employee.eName?.charAt(0)?.toUpperCase() || "E"}</span>
                      <span>
                        <strong>{employee.eName} {employee.eLastName}</strong>
                        <small>Employee</small>
                      </span>
                    </div>
                  </td>
                  <td>{employee.age}</td>
                  <td><span className="department-tag">{employee.dept}</span></td>
                  <td>₹{Number(employee.salary).toLocaleString("en-IN")}</td>
                  <td>{employee.phone}</td>
                  <td>
                    <div className="table-actions">
                      <button className="text-button edit-text" onClick={() => onEdit(employee)}>Edit</button>
                      <button className="text-button delete-text" onClick={() => onDelete(employee.empId)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="table-footer">Showing {filteredEmployees.length} of {employees.length} employees</div>
    </section>
  );
}

export default GetAllEmployees;
