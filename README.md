# Corporate Helpdesk Ticketing System 🎫

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/frontend-React-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/backend-Node.js-339933?logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/database-MongoDB-47A248?logo=mongodb&logoColor=white)
![Tailwind](https://img.shields.io/badge/styling-Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)

A Full-Stack MERN Application for Managing IT Support Tickets with an integrated Machine Learning priority prediction system.

---

## 🚀 Overview

The **Corporate Helpdesk Ticketing System** is a full-stack web application designed to streamline IT support operations within an organization. It allows employees to raise issues and enables admins to manage, assign, and resolve them efficiently.

Unlike traditional manual or email-based systems, this project provides a smart, automated approach to ticket lifecycle management with role-based access control, real-time status tracking, and AI-driven priority classification.

---

## 📸 System Screenshots

### 1. Admin Dashboard
The command center for administrators. Displays real-time metrics, active tickets, and quick actions to manage support requests.
![Admin Dashboard](docs/screenshots/admin%20dashboard.png)

### 2. Employee Ticket Creation (with ML Prediction)
A sleek, accessible interface for employees to log issues. The system automatically analyzes the subject and description to suggest the priority.
![Employee Ticket View](docs/screenshots/ticket%20creation.png)

### 3. Secure Authentication
Modern, glassmorphism-styled login page ensuring secure access to the platform.
![Login Page](docs/screenshots/sigin%20page.png)

---

## ✨ Key Features

- **Smart Priority Prediction:** Utilizes a local NLP model (`@xenova/transformers`) to automatically predict ticket priority (Low/Medium/High) based on text context.
- **Robust Authentication:** Secure JWT-based authentication and role-based authorization (Admin vs. Employee).
- **Ticket Lifecycle Management:** Restricts unauthorized status changes. Features a dedicated "Reopen" workflow for unresolved issues, with admin notifications.
- **Modern UI/UX:** Responsive, dark-mode focused UI built with Tailwind CSS, featuring subtle animations, skeleton loaders, and intuitive navigation.
- **Comprehensive Dashboards:** Separate views for employees (tracking personal tickets) and admins (managing global queues).

---

## 🧠 Deep Dive: Important Code & Mechanisms

### 1. ML-Powered Priority Prediction
To reduce the manual triage burden on support staff, the system uses a local, zero-shot classification model to predict ticket priority. This runs entirely in the Node.js backend using `@xenova/transformers`.

**Location:** `backend/utils/mlPriority.js`

```javascript
import { pipeline, env } from '@xenova/transformers';

// Uses MobileBERT MNLI for lightweight zero-shot classification
export async function predictTicketPriority(title, description) {
  try {
    const model = await getClassifier();
    const textToAnalyze = `Ticket Subject: ${title}. Description: ${description}.`;
    
    const candidateLabels = [
      'emergency critical high priority', 
      'standard normal medium priority', 
      'trivial minor low priority'
    ];
    
    const result = await model(textToAnalyze, candidateLabels, {
      hypothesis_template: 'The urgency and severity of this IT helpdesk ticket is {}.'
    });
    
    // Extracts the top scoring label to assign High/Medium/Low automatically
    const topLabel = result.labels[0];
    if (topLabel.includes('high priority')) return 'High';
    if (topLabel.includes('low priority')) return 'Low';
    return 'Medium';
  } catch (error) {
    return 'Medium'; // Fallback
  }
}
```

### 2. Strict Ticket Lifecycle & Reopen Mechanism
The system enforces strict state transitions. Employees cannot arbitrarily change ticket statuses; only admins can move tickets to "In Progress" or "Resolved". However, if an employee feels an issue was closed prematurely, they can "Reopen" the ticket.

**Location:** `backend/models/Ticket.js`

```javascript
const ticketSchema = new mongoose.Schema({
  // ...other fields
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open',
  },
  isReopened: {
    type: Boolean,
    default: false,
  },
  // Tracks the timestamp for SLA monitoring
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to auto-update timestamp on any change
ticketSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});
```
When a ticket is reopened, `isReopened` is set to `true`, and the status reverts to `Open`, flagging it heavily in the Admin Dashboard for immediate review.

---

## 📂 Detailed File Structure

```bash
.
├── frontend/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/       # Shared UI logic
│   │   │   ├── Header.jsx           # Global navigation
│   │   │   ├── ProtectedRoute.jsx   # Role-based route guarding
│   │   │   ├── SkeletonLoaders.jsx  # Fallback UI while fetching data
│   │   │   └── TicketCard.jsx       # Card UI for ticket lists
│   │   ├── pages/            # Main Application Views
│   │   │   ├── AdminDashboard.jsx   # Global queue & admin controls
│   │   │   ├── EmployeeDashboard.jsx# Personal ticket tracking
│   │   │   ├── CreateTicket.jsx     # Form for new tickets
│   │   │   └── Login.jsx/Register.jsx # Auth flows
│   │   ├── services/         # Axios API abstraction layer
│   │   ├── context/          # React Context (AuthContext)
│   │   ├── utils/            # Shared formatting/validation tools
│   │   ├── App.jsx           # Router configuration
│   │   └── main.jsx          # React DOM entry
│   └── vite.config.js
│
└── backend/                  # Node.js + Express backend
    ├── models/               # Mongoose DB Schemas
    │   ├── User.js              # User profiles & roles
    │   └── Ticket.js            # Ticket lifecycle tracking
    ├── controllers/          # Business logic handlers
    ├── routes/               # Express API endpoints
    ├── middleware/           # System intermediaries
    │   └── authMiddleware.js    # JWT verification & role checking
    ├── utils/                # Helper tools
    │   └── mlPriority.js        # HuggingFace NLP integration
    ├── config/               # Database connection setup
    └── server.js             # Express application entry
```

---

## 🔌 API Endpoints  

### 🔑 Authentication  
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate and receive JWT |
| GET | `/api/auth/me` | Fetch current user profile |

### 🎟️ Tickets  
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/tickets` | Create a new ticket (ML analyzed) | All |
| GET | `/api/tickets` | Get all tickets | Admin |
| GET | `/api/tickets/my-tickets` | Get user's created tickets | Employee |
| GET | `/api/tickets/:id` | Get single ticket details | All |
| PUT | `/api/tickets/:id` | Update status/priority | Admin |
| DELETE| `/api/tickets/:id` | Remove a ticket | Admin |

---

## 🛠️ Tech Stack  

**Frontend:** React 18, Vite, React Router, Axios, Tailwind CSS, Formik & Yup, React Toastify.  
**Backend:** Node.js, Express.js, MongoDB (Atlas), Mongoose, JWT, Bcrypt, `@xenova/transformers`.  

---

## 📦 Setup & Installation  

### 🔧 Prerequisites  
- Node.js (v18+ recommended)  
- MongoDB connection string  

### ⚙️ Backend Setup  

```bash
cd backend
npm install

# Create a .env file based on provided values
# Required: PORT, MONGODB_URI, JWT_SECRET, JWT_EXPIRE

npm run dev
```
*Note: The first time the backend starts, it will download the ML model (~100MB) required for priority predictions.*

### 🌐 Frontend Setup  

```bash
cd frontend
npm install
npm run dev
```
*Access the application at `http://localhost:5173`*

---

## 👥 Team Members (SRM University AP)  

| Name             | Registration No. |
|------------------|------------------|
| Om Awasthi       | AP24110010284    |
| Om Mittal        | AP24110010404    |
| Piyush Raj       | AP24110010439    |
| Suryansh Kumar   | AP24110010446    |
