# TaskFlow

## 🎯 Overview
TaskFlow is a modern task‑management web application built with **React + Vite** on the frontend and **Node.js + Express** on the backend. Users can create, edit, and track tasks, with data stored in MongoDB.

## 🛠️ Tech Stack
- **Frontend**: React 19, Vite, Axios, React Router, Lucide‑React
- **Backend**: Node.js 20, Express, MongoDB (via Mongoose)
- **Deployment**: Static hosting (Vercel, Netlify, Cloudflare Pages) for the frontend and any Node.js host (Render, Railway, Heroku) for the backend.

## 📦 Getting Started

### Prerequisites
- Node.js ≥ 20
- npm (comes with Node)
- A MongoDB instance (local or Atlas)

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/TaskFlow.git
cd TaskFlow

# Backend dependencies
cd taskflow-backend
npm install

# Frontend dependencies
cd ../taskflow-frontend
npm install
```

### Development
```bash
# Backend (run on port 3000 by default)
cd taskflow-backend
npm run dev   # or use nodemon if configured

# Frontend (Vite dev server)
cd ../taskflow-frontend
npm run dev
```
Open `http://localhost:5173` to view the app.

## 📈 Production Build
```bash
cd taskflow-frontend
npm run build   # outputs to ./dist
```
Deploy the generated **dist** folder to any static‑site hosting provider.

## 🌐 Hosting Guide (No Docker)

### Backend (Render / Railway / Heroku)
1. **Create a new service** and point it to the `taskflow-backend` directory.
2. **Build command** – `npm install`
3. **Start command** – `node server.js` (ensure the platform provides a `PORT` env variable).
4. **Add environment variables** from `.env.example` (e.g., `MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL`).
5. Enable CORS for your frontend URL in `server.js`.

### Frontend (Vercel / Netlify / Cloudflare Pages)
1. **Connect the GitHub repo** and set the root directory to `taskflow-frontend`.
2. **Framework preset** – Vite.
3. **Build command** – `npm run build`.
4. **Output directory** – `dist`.
5. **Environment variable** – `VITE_API_URL` pointing to the live backend URL (e.g., `https://taskflow-backend.onrender.com`).

## 🔐 Environment Variables Summary

### Backend (`taskflow-backend/.env`)
| Variable | Description |
|---|---|
| PORT | Port for the server (default 3000) |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT signing |
| FRONTEND_URL | URL of the deployed frontend for CORS |

### Frontend (`taskflow-frontend/.env`)
| Variable | Description |
|---|---|
| VITE_API_URL | Base URL of the backend API |

## 📄 License
MIT


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
