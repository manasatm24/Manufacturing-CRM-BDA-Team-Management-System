# Manufacturing CRM - Client

Front-end built with React (Vite) and Tailwind CSS.

Setup:

1. Copy `.env.example` to `.env` and set `VITE_API_URL`.
2. Run `npm install`.
3. Run `npm run dev` to start development server.

Build:

- `npm run build` to create production build for Vercel.

Deployment (Vercel)
1. Ensure `VITE_API_URL` in `.env` points to your backend API URL (deployed Render URL or localhost during testing).
2. Create a Vercel project and point it to the `client` folder of this repository.
3. Vercel will use `client/vercel.json` to build the app. The build command is `npm run build` and output directory is `dist`.
4. Set any environment variables in the Vercel dashboard (e.g., `VITE_API_URL`).
