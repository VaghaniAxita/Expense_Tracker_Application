
# Expense Tracker API 

A professional, scalable, and secure backend API for tracking user expenses. It supports CRUD operations, JWT authentication, role-based access control, bulk delete, pagination, filtering, and sorting.


 - Deploy on Render:https://expense-tracker-application-i6br.onrender.com
____________________________________________________




## Tech Stack

- Node.js :	Runtime environment for running the server.
- Express.js	Handles routes, requests, and middleware.
- MongoDB	NoSQL database to store expenses and users.
- Mongoose	Makes it easier to interact with MongoDB.
- JWT (jsonwebtoken)	Handles token-based authentication.
- 	bcryptjs	Password hashing to protect user data.

## Setup

1. Clone the Repository

```bash
 https://github.com/VaghaniAxita/Expense_Tracker_Application
```

2. Navigate to the Project Directory:

```bash
  cd backend  
```

3. Run the server:
```bash
  nodemon
```




# Routes

### User Authentication Routes
  
  **Register  User**

- Route: POST /api/auth/register
- Description: Register a new user
- Request Body:
```bash
  {
    "name": "John",
    "email": "john@gmail.com.com",
    "password": "123456"
}
```
- Sample Response:
  - Status: 201 Created
   - Body:
```bash
  {
  "success": true,
  "data": {
    "id": "63c9f25f4b0b6500164edc91",
    "name": "John",
    "email": "john@gmail.com"
  }
}
```

**User Login**

- Route: POST /api/auth/login
- Description:Login an existing user
- Request Body:
```bash
 {
  "email": "john@example.com",
    "password": "123456"
}
```
- Sample Response:
  - Status: 200 OK
   - Body:
```bash
 {
 "success": true,
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjJkNDE1MTJlZGY0ZjU1M2ZiNTViMyIsImlhdCI6MTczNDUzMDExOSwiZXhwIjoxNzM3MTIyMTE5fQ.GuvWtrmShK-1v7hOfBmPvL1T74g3BT2varjMnStFEeg"
}
```
**Get All Users**
- Route: GET /api/auth/allusers
- Description: Fetch all registered users
- Sample Response:
    - Status: 200 OK
    -  Body:
```bash
 [
  {
    "_id": "648e61c7c5d1a6123c4f4a12",
    "name": "John",
    "email": "john@gmail.com",
    "createdAt": "2024-12-01T08:23:45.123Z",
    "updatedAt": "2024-12-01T08:23:45.123Z"
  }
]
```

###  Expense Routes

**Add Expense**

- Route: POST /api/expenses
- Description: 	Add a new expense.
- Request Body:
```bash
 {
  "title": "Netflix Subscription",
  "amount": 15,
  "category": "Entertainment",
  "paymentMethod": "Credit"
}
```
- Sample Response:
  - Status: 201 Created
   - Body:
```bash
  {
  "success": true,
  "data": {
    "id": "63c9f25f4b0b6500164edc95",
    "title": "Netflix Subscription",
    "amount": 15,
    "category": "Entertainment",
    "paymentMethod": "Credit"
  }
}
```

**Get All Expenses**
- Route: GET /api/expenses
- Description: Get all expenses with support for filtering, sorting, and pagination. 
- Sample Response:
    - Status: 200 OK
    -  Body:
```bash
{
  "success": true,
  "count": 2,
  "total": 100,
  "page": 1,
  "limit": 10,
  "data": [
    {
      "id": "63c9f25f4b0b6500164edc92",
      "title": "Grocery Shopping",
      "amount": 100,
      "category": "Food",
      "paymentMethod": "Cash"
    },
    {
      "id": "63c9f25f4b0b6500164edc93",
      "title": "Fuel",
      "amount": 50,
      "category": "Transport",
      "paymentMethod": "Credit"
    }
  ]
}
```

**Update Expense**
- Route: PATCH /api/expenses/:id
- Description: Update an existing expense
- Request Body:
```bash
 {
  "amount": 20
}
```
- Sample Response:
  - Status: 200 OK
   - Body:
```bash
   {
  "success": true,
  "data": {
    "id": "63c9f25f4b0b6500164edc95",
    "title": "Netflix Subscription",
    "amount": 20
  }
}
```

**Delete Expense**
- Route: DELETE /api/expenses/:id
- Description:Delete an expense by ID.
- Sample Response:
   - Status: 200 OK
   - Body:
```bash
 {
  "success": true,
  "message": "Expense deleted successfully"
}
```
**Bulk Delete Expenses**
- Route: DELETE /api/expenses
- Description:Bulk delete multiple expenses using an array of IDs.
- Request Body:
```bash
 {
  "ids": ["63c9f25f4b0b6500164edc91", "63c9f25f4b0b6500164edc92"]
}
```
- Sample Response:
   - Status: 200 OK
   - Body:
```bash
 {
  "success": true,
  "message": "2 expenses deleted successfully"
}
```
  
  
