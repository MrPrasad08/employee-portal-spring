import React from "react";

function EditEmployee({ employee, onChange, onSubmit, onCancel, loading }) {
  return (
    <section className="content-card">
      <div className="section-heading">
        <div>
          <span className="eyebrow">UPDATE RECORD</span>
          <h2>Edit Employee #{employee.empId}</h2>
          <p className="muted">Change the required details and save your updates.</p>
        </div>
        <button className="button button-light" type="button" onClick={onCancel}>Cancel</button>
      </div>

      <form className="employee-form" onSubmit={onSubmit}>
        <div className="form-field">
          <label>First name</label>
          <input name="eName" value={employee.eName} onChange={onChange} required />
        </div>
        <div className="form-field">
          <label>Last name</label>
          <input name="eLastName" value={employee.eLastName} onChange={onChange} required />
        </div>
        <div className="form-field">
          <label>Age</label>
          <input name="age" type="number" min="18" max="100" value={employee.age} onChange={onChange} required />
        </div>
        <div className="form-field">
          <label>Salary</label>
          <input name="salary" type="number" min="0" step="0.01" value={employee.salary} onChange={onChange} required />
        </div>
        <div className="form-field">
          <label>Department</label>
          <input name="dept" value={employee.dept} onChange={onChange} required />
        </div>
        <div className="form-field">
          <label>Phone number</label>
          <input name="phone" type="tel" inputMode="numeric" pattern="[0-9]{10}" value={employee.phone} onChange={onChange} required />
        </div>
        <div className="form-actions">
          <button className="button button-light" type="button" onClick={onCancel}>Cancel</button>
          <button className="button button-primary" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Employee"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditEmployee;
