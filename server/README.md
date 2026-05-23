# Manufacturing CRM & BDA Team Management System - Server

Backend built with Node.js, Express and MongoDB (Mongoose).

Available scripts:

- `npm install` to install dependencies
- `npm run dev` to start with nodemon
- `npm start` to run production

Environment variables: copy `.env.example` to `.env` and provide `MONGO_URI` and `JWT_SECRET`.

Deployment (Render)
1. Push this repository to a Git provider (GitHub/GitLab/Bitbucket).
2. In Render, create a new Web Service and import from the repo. You can import `server/render.yaml` to prefill settings.
3. Configure environment variables `MONGO_URI` and `JWT_SECRET` in Render dashboard or use secrets.
4. Render will run `npm install` and `npm start` per `render.yaml`.

Notes:
- Ensure `repo` in `server/render.yaml` is set to your Git URL or create the service manually and copy the values.
