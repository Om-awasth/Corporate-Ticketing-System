🎫 Corporate Helpdesk Ticketing System

A Full-Stack MERN Application for Managing IT Support Tickets

🚀 Overview

The Corporate Helpdesk Ticketing System is a full-stack web application designed to streamline IT support operations within an organization. It allows employees to raise issues and enables admins to manage, assign, and resolve them efficiently.

This project demonstrates:

• Full-stack development using MERN
• Authentication & Authorization using JWT
• RESTful API design
• Role-based access control
• Ticket lifecycle management

Developed as part of:

• Course: Full Stack Development
• Institution: SRM University – AP
• Academic Year: 2025–26

✨ Key Features
🔐 Authentication & Security

• User Registration (Employee role)
• Secure Login with JWT
• Protected Routes
• Role-based Access (Admin / Employee)

🎟️ Ticket Management

• Create support tickets
• View personal tickets (Employee)
• View all tickets (Admin)
• Update ticket status: Open → In Progress → Resolved
• Priority levels: Low / Medium / High
• Ticket assignment by Admin

📊 Dashboard

• Employee dashboard (personal tickets)
• Admin dashboard (all tickets)
• Status-based filtering
• Statistics overview

🎨 User Interface

• Responsive design using Tailwind CSS
• Form validation (Formik & Yup)
• Toast notifications
• Loading states

🛠️ Tech Stack
🌐 Frontend

• React 18
• Vite
• React Router
• Axios
• Tailwind CSS
• Formik & Yup
• React Toastify

⚙️ Backend

• Node.js
• Express.js
• MongoDB
• Mongoose
• JWT
• Bcrypt

⚙️ System Workflow
User registers or logs in
Employee creates a ticket
Ticket is stored in MongoDB
Admin views and assigns tickets
Ticket status updates step-by-step
Users track progress via dashboard
📂 Project Structure
.
├── frontend/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page-level components
│   │   ├── services/        # API calls (Axios)
│   │   ├── context/         # Global state (Auth)
│   │   ├── utils/           # Helper functions
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── vite.config.js
│
└── backend/                  # Node.js + Express backend
    ├── models/              # MongoDB schemas
    ├── controllers/         # Business logic
    ├── routes/              # API endpoints
    ├── middleware/          # Auth & error handling
    ├── config/              # DB configuration
    ├── server.js            # Entry point
    └── package.json
🔌 API Endpoints
🔑 Authentication

POST /api/auth/register → Register user
POST /api/auth/login → Login user
GET /api/auth/me → Get current user

🎟️ Tickets

POST /api/tickets → Create ticket
GET /api/tickets → Get all / personal tickets
GET /api/tickets/:id → Get single ticket
PUT /api/tickets/:id → Update ticket
DELETE /api/tickets/:id → Delete ticket
GET /api/tickets/my-tickets → Get user tickets

📝 Ticket Updates

POST /api/ticket-updates/:ticketId → Add update
GET /api/ticket-updates/:ticketId → Get updates

📦 Installation & Usage
🧩 Clone Repository
git clone <your-repo-link>
cd Corporate-Ticketing-System
⚙️ Backend Setup
cd backend
npm install
npm run dev

Runs on: http://localhost:5000

🌐 Frontend Setup
cd frontend
npm install
npm run dev

Runs on: http://localhost:3000

🔐 Environment Variables
Backend (.env)
PORT=5000
MONGODB_URI=mongodb://localhost:27017/helpdesk
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
Frontend (.env)
VITE_API_URL=http://localhost:5000/api
📘 Concepts Demonstrated
🧱 Full Stack Development

• MERN Architecture
• API Integration

🔐 Security

• JWT Authentication
• Password hashing with Bcrypt

📊 System Design

• Role-based access control
• Ticket lifecycle management

🎨 Frontend Engineering :
• Component-based architecture
• State management (Context API)
• Form validation

👥 Team Members :
Name	Registration No.
Om Awasthi	AP24110010284
Om Mittal	AP24110010404
Piyush Raj	AP24110010439
Suryansh Kumar	AP24110010446

📝 Conclusion :
This project demonstrates a real-world full-stack system with secure authentication, structured backend, and efficient ticket handling.

🔮 Future Enhancements :
• Email notifications
• File attachments
• Advanced filtering & pagination
• Admin analytics dashboard
• User profile management
• Email verification
