package com.basicSpring07.employeeManagement.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.basicSpring07.employeeManagement.model.Employee;
import com.basicSpring07.employeeManagement.repository.EmployeeRepo;

@Service
public class EmployeeSerImplementation implements EmployeeService {

	@Autowired
	EmployeeRepo empRepo;

	@Override
	public Employee createEmployee(Employee emp) {
		return empRepo.save(emp);
	}

	@Override
	public Employee getEmployee(Integer eid) {
		// TODO Auto-generated method stub
		return empRepo.findById(eid).get();
	}

	@Override
	public List<Employee> getAllEmployees() {
		return empRepo.findAll();
	}

	@Override
	public void deleteEmployee(Integer eid) {
		// TODO Auto-generated method stub
		empRepo.deleteById(eid);
	}

	@Override
	public Employee updateEmployee(Integer eid, Employee e) {
		// TODO Auto-generated method stub
		Employee oldEmp = getEmployee(eid);

		oldEmp.setEName(e.getEName());
		oldEmp.setELastName(e.getELastName());
		oldEmp.setAge(e.getAge());
		oldEmp.setDept(e.getDept());
		oldEmp.setSalary(e.getSalary());
		oldEmp.setPhone(e.getPhone());

		return empRepo.save(oldEmp);
	}

}
