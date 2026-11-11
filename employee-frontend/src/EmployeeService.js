import axios from "axios";

const API_URL = "http://localhost:9346/employee";

// Insert a new employee.
export const createEmployee = (employee) => {
  return axios.post(`${API_URL}/createEmployee`, employee);
};

// Get one employee using employee ID.
export const getEmployeeById = (id) => {
  return axios.get(`${API_URL}/getEmp/${id}`);
};

// Get all employee records.
export const getAllEmployees = () => {
  return axios.get(`${API_URL}/getAllEmp`);
};

// Update an existing employee.
export const updateEmployee = (id, employee) => {
  return axios.put(`${API_URL}/updateEmp/${id}`, employee);
};

// Delete an employee.
export const deleteEmployee = (id) => {
  return axios.delete(`${API_URL}/delEmp/${id}`);
};
