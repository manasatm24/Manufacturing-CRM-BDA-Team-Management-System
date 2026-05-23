# Manufacturing CRM & BDA Team Management System

A full-stack MERN CRM built for a manufacturing company's Business Development Associate (BDA) workflow. The system helps admins and employees manage leads, assign follow-ups, track conversion performance, and review sales reports from a professional dashboard.

## Tech Stack

Frontend:

- React.js with Vite
- Tailwind CSS
- React Router DOM
- Axios
- Recharts

Backend:

- Node.js
- Express.js
- MongoDB Atlas with Mongoose
- JWT Authentication
- bcryptjs
- dotenv
- cors

## Features

- Admin and employee signup/login
- JWT protected routes
- Role-based admin route for employee creation
- Logout functionality
- Dashboard cards for total leads, converted leads, and pending follow-ups
- Monthly conversion chart
- Employee performance chart
- Lead CRUD: create, view, edit, delete
- Search leads by client name
- Filter leads by status
- Assign leads to employees
- Follow-up date and notes tracking
- Employee listing and employee creation
- Reports section for daily, monthly, and conversion summaries
- Toast notifications, loading states, and form validation
- Responsive dashboard with sidebar and navbar
- Deployment-ready configuration for Vercel and Render

## Project Structure

```text
Manufacturing CRM & BDA Team Management System/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.cjs
│   ├── vite.config.js
│   ├── vercel.json
│   └── .env.example
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   ├── render.yaml
│   ├── server.js
│   └── .env.example
├── render.yaml
├── DEPLOYMENT.md
└── README.md
```

## Database Collections

Users:

- `name`
- `email`
- `password`
- `role`

Leads:

- `clientName`
- `companyName`
- `phone`
- `email`
- `status`
- `assignedTo`
- `followUpDate`
- `notes`

Reports:

- `employee`
- `sales`
- `month`

## Backend API Endpoints

Auth:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

Leads:

- `POST /api/leads`
- `GET /api/leads`
- `GET /api/leads/:id`
- `PUT /api/leads/:id`
- `DELETE /api/leads/:id`

Employees:

- `POST /api/employees`
- `GET /api/employees`

Dashboard:

- `GET /api/dashboard/stats`

Reports:

- `GET /api/reports/summary`

## Environment Variables

Create `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_random_jwt_secret
JWT_EXPIRES_IN=7d
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Local Setup

Install backend dependencies:

```powershell
cd server
npm install
```

Install frontend dependencies:

```powershell
cd ../client
npm install
```

Start backend:

```powershell
cd ../server
npm run dev
```

Start frontend:

```powershell
cd ../client
npm run dev
```

Open the app:

```text
http://localhost:3000
```

## Local Demo Mode

If `MONGO_URI` is not set, the backend runs with temporary in-memory demo data so the app can be reviewed locally.

Demo admin login:

```text
Email: admin@example.com
Password: admin123
```

Data from demo mode resets when the backend restarts. Use MongoDB Atlas for persistent data.

## Deployment

Frontend is ready for Vercel using `client/vercel.json`.

Backend is ready for Render using `render.yaml` or `server/render.yaml`.

See [DEPLOYMENT.md](DEPLOYMENT.md) for the full live deployment checklist.

## Assessment Checklist

- Complete `client/` and `server/` folder structure
- MVC backend architecture
- MongoDB models for users, leads, and reports
- JWT authentication with bcrypt password hashing
- Protected frontend routes
- Professional dashboard UI
- CRUD operations for lead management
- Employee management workflow
- Reports and analytics
- Environment variable examples
- Deployment configuration
