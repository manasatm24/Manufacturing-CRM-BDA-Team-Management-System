# Manufacturing CRM & BDA Team Management System

This repository contains a full-stack MERN application scaffold for a Manufacturing CRM and BDA Team Management System.

Folders:

- `server/` - Express backend
- `client/` - React frontend (Vite/Tailwind)

Follow the respective `README.md` files to run server and client locally.

Deployment quick guide:

- Frontend (Vercel): Deploy the `client` folder. Use `client/vercel.json` and set `VITE_API_URL` in Vercel environment variables.
- Backend (Render): Deploy the `server` folder. You can import `server/render.yaml` in Render or create a Web Service and set `MONGO_URI` and `JWT_SECRET`.

See `DEPLOYMENT.md` for the complete live deployment checklist.
