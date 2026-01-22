# 🎮 PlayStation Tournament Management System – Server

## 📌 Overview

This is the **backend server** for the PlayStation Tournament Management System.
It is built using **Node.js**, **Express**, and **PostgreSQL**.

The server provides a REST API that handles:
- User authentication (signup & login)
- Role-based authorization (Admin / Player)
- Tournament management
- Player join requests
- Match generation and results
- Database operations

The backend communicates with a React frontend.

---

## 🎯 Purpose of the Server

The server is responsible for:
- Validating user credentials
- Controlling access based on user role
- Managing tournaments and matches
- Storing and retrieving data from the database
- Ensuring secure and organized communication between client and database

---

## 👥 User Roles

### 👤 Player
- Create an account
- Log in to the system
- View available tournaments
- Request to join tournaments
- View join request status
- View joined tournaments
- View match results
- View and update personal profile data

### 🛠️ Admin
- Create tournaments
- View all tournaments
- Start tournaments
- Approve or reject join requests
- Generate matches
- Select match winners
- Delete tournaments

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- PostgreSQL
- pg (PostgreSQL client)
- dotenv
- cors
- REST API architecture

---

## 🔐 Authentication & Authorization

- Users authenticate using **email and password**
- Login and signup are handled through API endpoints
- User role (Admin / Player) is stored in the database
- Authorization is enforced using middleware
- Admin-only routes are protected using `adminAuth` middleware
- Authentication state is managed on the frontend
- User session data is stored using **localStorage**

> This project uses a simple role-based authentication approach suitable for the project scope.

---

## 📂 Project Structure

# 🎮 PlayStation Tournament Management System – Server

## 📌 Overview

This is the **backend server** for the PlayStation Tournament Management System.
It is built using **Node.js**, **Express**, and **PostgreSQL**.

The server provides a REST API that handles:
- User authentication (signup & login)
- Role-based authorization (Admin / Player)
- Tournament management
- Player join requests
- Match generation and results
- Database operations

The backend communicates with a React frontend.

---

## 🎯 Purpose of the Server

The server is responsible for:
- Validating user credentials
- Controlling access based on user role
- Managing tournaments and matches
- Storing and retrieving data from the database
- Ensuring secure and organized communication between client and database

---

## 👥 User Roles

### 👤 Player
- Create an account
- Log in to the system
- View available tournaments
- Request to join tournaments
- View join request status
- View joined tournaments
- View match results
- View and update personal profile data

### 🛠️ Admin
- Create tournaments
- View all tournaments
- Start tournaments
- Approve or reject join requests
- Generate matches
- Select match winners
- Delete tournaments

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- PostgreSQL
- pg (PostgreSQL client)
- dotenv
- cors
- REST API architecture

---

## 🔐 Authentication & Authorization

- Users authenticate using **email and password**
- Login and signup are handled through API endpoints
- User role (Admin / Player) is stored in the database
- Authorization is enforced using middleware
- Admin-only routes are protected using `adminAuth` middleware
- Authentication state is managed on the frontend
- User session data is stored using **localStorage**

> This project uses a simple role-based authentication approach suitable for the project scope.

---

## 📂 Project Structure
```
server/
│── middleware/
│ └── adminAuth.js
│
│── routes/
│ ├── auth.js
│ ├── admin/
│ │ ├── tournaments.js
│ │ ├── matches.js
│ │ └── requests.js
│ └── player/
│ ├── tournaments.js
│ ├── requests.js
│ ├── matches.js
│ └── profile.js
│
│── db.js
│── server.js
│── package.json
│── .env

```

---

## 🌐 API Endpoints

### 🔑 Authentication
- `POST /api/auth/signup`
- `POST /api/auth/login`

---

### 🧑 Player Routes
- `GET /api/player/profile`
- `PUT /api/player/profile`
- `GET /api/player/tournaments`
- `POST /api/player/requests`
- `GET /api/player/matches`

---

### 🛠️ Admin Routes (Protected)
- `POST /api/admin/tournaments`
- `GET /api/admin/tournaments`
- `GET /api/admin/tournaments/:id`
- `PUT /api/admin/tournaments/:id/start`
- `PUT /api/admin/tournaments/:id/winner`
- `DELETE /api/admin/tournaments/:id`
- `GET /api/admin/requests`
- `PUT /api/admin/requests/:id/approve`
- `PUT /api/admin/requests/:id/reject`
- `POST /api/admin/matches/generate`

---

## ⚙️ Environment Variables

Create a `.env` file inside the `server` folder:

## 🚀 Getting Started

### Install dependencies
cd server
npm install