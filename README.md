Project Management API
Description

A RESTful Project Management API built with Node.js, Express.js, and MongoDB.

The application allows users to register, authenticate using JWT, manage projects, and create tasks within projects. It also includes role-based authorization, input validation, password hashing, email verification, and database seed files.

Tech Stack
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
Joi Validation
bcrypt
Nodemailer

uthentication
User Registration
Email Verification
User Login
JWT Authentication
Projects
Create Project
Get All User Projects
Get Single Project
Update Project
Delete Project
Tasks
Create Task Under Project
Get All Tasks For Project
Get Single Task
Update Task
Delete Task
Filter Tasks By Status
Filter Tasks By Priority
Validation
Request validation using Joi
Security
Password hashing using bcrypt
JWT authentication
Role-based authorization
Database Seed
Seed user data
Seed project data

Installation

Clone the repository:

git clone git@github.com:tarek-10/Project_Mangement.git

Install dependencies:

npm install

Create a .env file based on .env.example.

Start the application:

npm start

Development mode:

npm run dev

Run seed files:

npm run seed
Environment Variables

Create a .env file and configure:

PORT=3000
MONGODB_URI=mongodb://localhost:27017/project-management
PRIVATE_KEY=your_secret_key
EMAIL=our_email
PASSWORD=email password
Project Structure
project-management/
├── config/
├── enum/
├── middleware/
├── model/
├── module/
├── rbac/
├── router/
├── schema/
├── seed/
├── .env
├── app.js
└── package.json
API Documentation

The API can be tested using Postman Collection included in the repository.

Notes
Authentication is based on JWT.
Passwords are securely hashed using bcrypt.
MongoDB is used as the primary database.
Seed files are included for testing and development.

//testing section

## Unit Testing

This project includes unit tests using **Jest**.

### Covered Test Cases

#### User Signup

- Register user successfully.
- Return `409 Conflict` if the email already exists.
- Verify `bcrypt.hash` is called correctly.
- Verify `jsonwebtoken.sign` is called correctly.
- Verify email sending function is called.
- Verify user is inserted into the database.

#### User Login

- Login successfully.
- Verify user lookup by email.
- Verify password using `bcrypt.compare`.
- Verify JWT token generation.
- Verify successful login response.

### Run Tests

```bash
npm test
```

or

```bash
npm run test
```

### Technologies Used

- Jest
- Mock Functions (`jest.mock()`)
- Mock Return Values (`mockResolvedValue`, `mockReturnValue`)
- Assertions (`expect`, `toHaveBeenCalledWith`, `not.toHaveBeenCalled`)
