# 👨‍💼 Employee Management REST API

A **RESTful Employee Management API** built using **Java and Spring Boot**.

This project provides CRUD operations to create, retrieve, update, and delete employee records. The REST API can also be integrated with a frontend application such as **React.js**.

## 🚀 Technologies Used

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- REST API
- MySQL
- Maven
- React.js
- Postman
- Git & GitHub

## 📁 Project Structure

```text
Employee-Management/
│
├── src/
│   └── main/
│       ├── java/
│       │   └── com.basicSpring07.employeeManagement/
│       │       ├── controller/
│       │       │   └── EmployeeController.java
│       │       │
│       │       ├── model/
│       │       │   └── Employee.java
│       │       │
│       │       ├── repository/
│       │       │   └── EmployeeRepository.java
│       │       │
│       │       └── service/
│       │           └── EmployeeService.java
│       │
│       └── resources/
│           └── application.properties
│
└── pom.xml
```

## 🔗 Base URL

The application runs on port `9346`.

```text
http://localhost:9346/employee
```

## 🔥 REST API Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| POST | `/employee/createEmployee` | Create a new employee |
| GET | `/employee/getEmp/{eid}` | Get employee by ID |
| GET | `/employee/getAllEmp` | Get all employees |
| PUT | `/employee/updateEmp/{eid}` | Update employee details |
| DELETE | `/employee/delEmp/{eid}` | Delete an employee |

## 📌 API Details

### 1. Create Employee

```http
POST /employee/createEmployee
```

Example request:

```json
{
  "name": "Durga Prasad",
  "email": "durga@example.com",
  "department": "IT",
  "salary": 50000
}
```

### 2. Get Employee by ID

```http
GET /employee/getEmp/{eid}
```

Example:

```text
GET http://localhost:9346/employee/getEmp/1
```

### 3. Get All Employees

```http
GET /employee/getAllEmp
```

Example:

```text
GET http://localhost:9346/employee/getAllEmp
```

### 4. Update Employee

```http
PUT /employee/updateEmp/{eid}
```

Example:

```text
PUT http://localhost:9346/employee/updateEmp/1
```

Request body:

```json
{
  "name": "Durga Prasad",
  "email": "durga.prasad@example.com",
  "department": "Software Development",
  "salary": 60000
}
```

### 5. Delete Employee

```http
DELETE /employee/delEmp/{eid}
```

Example:

```text
DELETE http://localhost:9346/employee/delEmp/1
```

Response:

```text
Deleted Employee with id 1
```

## 🗄️ Database

This project uses **MySQL** as the database.

Configure your database connection in:

```text
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/employee_management
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

> Replace `YOUR_PASSWORD` with your MySQL password.

## ⚛️ React Integration

The backend is configured to allow requests from a React development server running on port `5173`.

```java
@CrossOrigin(origins = "http://localhost:5173")
```

Therefore, this API can be connected to a React frontend using tools such as **Axios** or the JavaScript `fetch()` API.

Example:

```javascript
axios.get("http://localhost:9346/employee/getAllEmp")
```

## 🧪 API Testing

You can test the APIs using **Postman**.

Recommended testing order:

```text
1. Create Employee
        ↓
2. Get Employee
        ↓
3. Get All Employees
        ↓
4. Update Employee
        ↓
5. Delete Employee
```

## ⚙️ How to Run the Project

### Step 1 — Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### Step 2 — Open the Project

Open the project in:

- Eclipse
- IntelliJ IDEA
- VS Code

### Step 3 — Configure MySQL

Create your database and update the database credentials in:

```text
application.properties
```

### Step 4 — Run Spring Boot Application

Run the main Spring Boot application class.

The server will start at:

```text
http://localhost:9346
```

### Step 5 — Test the API

Use Postman or connect the API with your React frontend.

## ✨ Features

- Create employee records
- Retrieve employee by ID
- Retrieve all employees
- Update employee information
- Delete employee records
- RESTful API architecture
- MySQL database integration
- Spring Data JPA integration
- React frontend integration
- CORS configuration
- JSON request/response handling

## 🔮 Future Enhancements

- Add Spring Security
- Add JWT authentication
- Add DTO layer
- Add global exception handling
- Add input validation
- Add pagination and sorting
- Add employee search functionality
- Add Swagger/OpenAPI documentation
- Deploy the application online

## 👨‍💻 Author

**Durga Prasad**

B.Tech Computer Science Engineering

GitHub: **MrPrasad08**

## ⭐ Support

If you found this project useful, consider giving the repository a ⭐ on GitHub.
