# Deployment Guide

This project deploys as two services:

- Backend API: Render Web Service from `server/`
- Frontend: Vercel Static/Vite app from `client/`

## 1. Create MongoDB Atlas Database

Create a MongoDB Atlas cluster and copy the connection string.

Use a database user/password, and allow Render outbound access. For simple student/demo deployment, Atlas Network Access can temporarily allow `0.0.0.0/0`.

Your connection string should look like:

```text
mongodb+srv://USERNAME:PASSWORD@cluster-name.mongodb.net/manufacturing_crm?retryWrites=true&w=majority
```

## 2. Deploy Backend on Render

Push this repository to GitHub first.

In Render:

1. Create a new Web Service.
2. Connect your GitHub repository.
3. Set Root Directory to `server`.
4. Set Build Command to `npm install`.
5. Set Start Command to `npm start`.
6. Add environment variables:

```text
MONGO_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<any long random secret>
JWT_EXPIRES_IN=7d
NODE_ENV=production
```

Render will give you a backend URL like:

```text
https://manufacturing-crm-server.onrender.com
```

Your API base URL is that URL plus `/api`:

```text
https://manufacturing-crm-server.onrender.com/api
```

## 3. Deploy Frontend on Vercel

In Vercel:

1. Create a new Project.
2. Import the same GitHub repository.
3. Set Root Directory to `client`.
4. Framework Preset: Vite.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Add environment variable:

```text
VITE_API_URL=https://manufacturing-crm-server.onrender.com/api
```

Replace the Render URL with your real backend URL.

## 4. Verify Live App

After both deployments finish:

1. Open the Vercel frontend URL.
2. Register a new account.
3. Log in.
4. Add and view leads.

If login fails, check:

- Render backend is awake and running.
- `MONGO_URI` is correct.
- `VITE_API_URL` ends with `/api`.
- MongoDB Atlas network access allows Render to connect.
