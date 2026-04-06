<<<<<<< HEAD
# Corporate-Ticketing-System
=======
# Corporate Helpdesk Ticketing System

A full-stack MERN application for managing IT support tickets within an organization.

## Project Structure

```
.
├── frontend/          # React frontend with Vite
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── context/        # Auth context
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── backend/           # Node.js + Express backend
    ├── models/        # Database models
    ├── controllers/   # Route controllers
    ├── routes/        # API routes
    ├── middleware/    # Auth & error handling
    ├── config/        # Database config
    ├── server.js
    └── package.json
```

## Setup Instructions

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend will run on `http://localhost:5000`

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/helpdesk
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

## Features Implemented

### Authentication
- User registration (employee role)
- User login with JWT
- Protected routes
- Role-based access control

### Ticket Management
- Create support tickets
- View all tickets (admin) or personal tickets (employee)
- Update ticket status (Open → In Progress → Resolved)
- Priority levels (Low, Medium, High)
- Ticket assignment (admin)

### Dashboard
- Employee dashboard with personal tickets
- Admin dashboard with all tickets
- Status filtering
- Statistics cards

### User Interface
- Responsive design with Tailwind CSS
- Form validation with Formik & Yup
- Toast notifications
- Loading states

## Technologies Used

### Frontend
- React 18
- Vite
- React Router
- Axios
- Formik & Yup
- Tailwind CSS
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
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
2. Ensure MongoDB is running locally
3. Start backend server: `npm run dev` in backend folder
4. Start frontend dev server: `npm run dev` in frontend folder
5. Access the application at `http://localhost:3000`

## Default Test Accounts

After setup, register new accounts through the application UI.

## Optional Enhancements

- Email notifications
- File attachments
- Advanced filtering & pagination
- Admin analytics dashboard
- User profile management
- Email verification
>>>>>>> e1b7d2c (Add initial files)
