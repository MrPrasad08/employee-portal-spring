package com.basicSpring07.employeeManagement.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.basicSpring07.employeeManagement.model.Employee;

@Service
public interface EmployeeService {

	Employee createEmployee(Employee emp);

	Employee getEmployee(Integer eid);

	List<Employee> getAllEmployees();

	public void deleteEmployee(Integer eid);

	Employee updateEmployee(Integer eid, Employee e);
}
