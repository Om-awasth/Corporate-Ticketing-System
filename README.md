# Corporate Helpdesk Ticketing System

A Full-Stack MERN Application for Managing IT Support Tickets  

---

## 🚀 Overview  

The **Corporate Helpdesk Ticketing System** is a full-stack web application designed to streamline IT support operations within an organization. It allows employees to raise issues and enables admins to manage, assign, and resolve them efficiently.  

Unlike traditional manual or email-based systems, this project provides:  

- Structured ticket management  
- Secure authentication system  
- Role-based access control  
- Real-time status tracking  
- Scalable backend architecture  

This project demonstrates real-world concepts of:  

- Full-stack development using MERN  
- Authentication & Authorization using JWT  
- RESTful API design  
- Role-based system design  
- Ticket lifecycle management  

- **Course:** Full Stack Development  
- **Institution:** SRM University AP  
- **Academic Year:** 2025–26  

---

## ✨ Key Features  

### 🔹 1. Authentication & Security  

- User Registration (Employee role)  
- Secure Login using JWT  
- Protected Routes  
- Role-based Access Control (Admin / Employee)  

---

### 🔹 2. Ticket Management  

- Create support tickets  
- View personal tickets (Employee)  
- View all tickets (Admin)  
- Update ticket status: **Open → In Progress → Resolved**  
- Priority levels: Low / Medium / High  
- Ticket assignment by Admin  

---

### 🔹 3. Dashboard System  

- Employee Dashboard (personal tickets)  
- Admin Dashboard (all tickets)  
- Status-based filtering  
- Quick statistics overview  

---

### 🔹 4. User Interface  

- Responsive UI using Tailwind CSS  
- Form validation (Formik & Yup)  
- Toast notifications  
- Loading states for better UX  

---

## 🛠️ Tech Stack  

### 🌐 Frontend  

- React 18  
- Vite  
- React Router  
- Axios  
- Tailwind CSS  
- Formik & Yup  
- React Toastify  

---

### ⚙️ Backend  

- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT (Authentication)  
- Bcrypt (Password hashing)  

---

## ⚙️ System Workflow  

1. Program starts → User registers or logs in  
2. Employee creates a support ticket  
3. Ticket is stored in MongoDB database  
4. Admin views and assigns tickets  
5. Ticket status updates step-by-step  
6. Users track progress through dashboard  

---

## 📂 Project Structure

``` bash
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
```

---

## 🔌 API Endpoints  

### 🔑 Authentication  

- POST /api/auth/register  
- POST /api/auth/login  
- GET /api/auth/me  

---

### 🎟️ Tickets  

- POST /api/tickets  
- GET /api/tickets  
- GET /api/tickets/:id  
- PUT /api/tickets/:id  
- DELETE /api/tickets/:id  

---

## 📦 Installation & Usage  

### 🔧 Prerequisites  

- Node.js  
- MongoDB  

---

### 🧩 Clone Repository  

```bash
git clone <your-repo-link>
cd Corporate-Ticketing-System
```

---

### ⚙️ Backend Setup  

```bash
cd backend
npm install
npm run dev
```

Backend will run on `http://localhost:5050`

### 🌐 Frontend Setup  

```bash
cd frontend
npm install
npm run dev
```

### Backend (.env)
```
PORT=5050
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>/helpdesk?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

## 👥 Team Members (SRM University AP)  

| Name             | Registration No. |
|------------------|------------------|
| Om Awasthi       | AP24110010284    |
| Om Mittal        | AP24110010404    |
| Piyush Raj       | AP24110010439    |
| Suryansh Kumar   | AP24110010446    |

---

## 📝 Conclusion  

This project demonstrates a real world full stack system with secure authentication, structured backend, and efficient ticket handling.  

---

## 🔥 Summary  

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- Bcrypt

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Tickets
- `POST /api/tickets` - Create ticket
- `GET /api/tickets` - Get all tickets (admin) or my tickets
- `GET /api/tickets/:id` - Get single ticket
- `PUT /api/tickets/:id` - Update ticket
- `DELETE /api/tickets/:id` - Delete ticket
- `GET /api/tickets/my-tickets` - Get user's tickets

### Ticket Updates
- `POST /api/ticket-updates/:ticketId` - Add update to ticket
- `GET /api/ticket-updates/:ticketId` - Get ticket updates

## Next Steps

1. Install dependencies in both frontend and backend
2. Create a MongoDB Atlas cluster and database user
3. Put the Atlas connection string into `backend/.env`
4. Start backend server: `npm run dev` in backend folder
5. Start frontend dev server: `npm run dev` in frontend folder
6. Access the application at `http://localhost:3000`

## Default Test Accounts

After setup, register new accounts through the application UI.

## Optional Enhancements

- Email notifications
- File attachments
- Advanced filtering & pagination
- Admin analytics dashboard
- User profile management
- Email verification
