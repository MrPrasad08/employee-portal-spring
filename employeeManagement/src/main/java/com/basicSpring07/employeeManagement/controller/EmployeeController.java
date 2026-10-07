package com.basicSpring07.employeeManagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.basicSpring07.employeeManagement.model.Employee;
import com.basicSpring07.employeeManagement.service.EmployeeService;

//http://localhost:9346/employee
@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

	@Autowired
	EmployeeService empSer;

	// http://localhost:9346/employee/createEmployee
	@PostMapping("/createEmployee")
	public Employee insertEmployee(@RequestBody Employee e) {
		return empSer.createEmployee(e);
	}

	// http://localhost:9346/employee/createEmployee/id
	@GetMapping("/getEmp/{eid}")
	public Employee getEmployee(@PathVariable Integer eid) {
		return empSer.getEmployee(eid);
	}

	// http://localhost:9346/employee/getAllEmp
	@GetMapping("/getAllEmp")
	public List<Employee> getAllEmps() {
		return empSer.getAllEmployees();
	}

	// http://localhost:9346/employee/delEmp/{eid}
	@DeleteMapping("/delEmp/{eid}")
	public String deleteEmployee(@PathVariable Integer eid) {
		empSer.deleteEmployee(eid);
		return "Deleted Employee with id " + eid;
	}

	// http://localhost:9346/employee/updateEmp/{eid}
	@PutMapping("/updateEmp/{eid}")
	public Employee updateEmployee(@PathVariable Integer eid, @RequestBody Employee e) {
		return empSer.updateEmployee(eid, e);
	}
}
