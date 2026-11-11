import React from "react";

function InsertEmployee({ employee, onChange, onSubmit, onClear, loading }) {
  return (
    <section className="content-card">
      <div className="section-heading">
        <div>
          <span className="eyebrow">EMPLOYEE RECORDS</span>
          <h2>Insert Employee</h2>
          <p className="muted">Enter the employee details below to create a new record.</p>
        </div>
      </div>

      <form className="employee-form" onSubmit={onSubmit}>
        <div className="form-field">
          <label>First name</label>
          <input name="eName" value={employee.eName} onChange={onChange} placeholder="Enter first name" required />
        </div>
        <div className="form-field">
          <label>Last name</label>
          <input name="eLastName" value={employee.eLastName} onChange={onChange} placeholder="Enter last name" required />
        </div>
        <div className="form-field">
          <label>Age</label>
          <input name="age" type="number" min="18" max="100" value={employee.age} onChange={onChange} placeholder="Enter age" required />
        </div>
        <div className="form-field">
          <label>Salary</label>
          <input name="salary" type="number" min="0" step="0.01" value={employee.salary} onChange={onChange} placeholder="Enter salary" required />
        </div>
        <div className="form-field">
          <label>Department</label>
          <input name="dept" value={employee.dept} onChange={onChange} placeholder="e.g. IT, HR, Finance" required />
        </div>
        <div className="form-field">
          <label>Phone number</label>
          <input name="phone" type="tel" inputMode="numeric" pattern="[0-9]{10}" value={employee.phone} onChange={onChange} placeholder="10-digit phone number" required />
        </div>
        <div className="form-actions">
          <button className="button button-light" type="button" onClick={onClear}>Clear</button>
          <button className="button button-primary" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Employee"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default InsertEmployee;
