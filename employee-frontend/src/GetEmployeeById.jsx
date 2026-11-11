import React from "react";

function GetEmployeeById({ searchId, onSearchChange, onSearch, employee }) {
  return (
    <section className="content-card">
      <div className="section-heading">
        <div>
          <span className="eyebrow">FIND A RECORD</span>
          <h2>Get Employee By ID</h2>
          <p className="muted">Enter an employee ID to find an individual record.</p>
        </div>
      </div>

      <form className="find-form" onSubmit={onSearch}>
        <input
          type="number"
          min="1"
          value={searchId}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Enter employee ID"
          required
        />
        <button className="button button-primary" type="submit">Search Employee</button>
      </form>

      {employee && (
        <div className="employee-detail">
          <div className="detail-heading">
            <span className="avatar large-avatar">{employee.eName?.charAt(0)?.toUpperCase() || "E"}</span>
            <div>
              <h3>{employee.eName} {employee.eLastName}</h3>
              <p className="muted">Employee ID: #{employee.empId}</p>
            </div>
          </div>
          <div className="detail-grid">
            <div><small>Age</small><strong>{employee.age}</strong></div>
            <div><small>Department</small><strong>{employee.dept}</strong></div>
            <div><small>Salary</small><strong>₹{Number(employee.salary).toLocaleString("en-IN")}</strong></div>
            <div><small>Phone</small><strong>{employee.phone}</strong></div>
          </div>
        </div>
      )}
    </section>
  );
}

export default GetEmployeeById;
