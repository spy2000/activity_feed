# 🚀 Full Stack Activity Management System

This is a full-stack web application built with:

- **Frontend:** React + TypeScript + Vite
- **Backend:** Node.js + Express + MongoDB
- **Real-time:** Socket.io
- **Database:** MongoDB (Local or Atlas)

The project is structured with separate `frontend` and `backend` folders.

---

# 📁 Project Structure

root
│
├── frontend/ # React + Vite + TypeScript
│
└── backend/ # Node.js + Express + MongoDB + Socket.io


---

# ⚙️ Backend Setup

## 📂 Navigate to Backend

```bash
cd backend

🧪 Create .env File

Create a file named .env in the backend folder:
backend/.env

PORT=4000

MONGO_URI=mongodb://127.0.0.1:27017/activity_app

💡 Make sure MongoDB is running locally on your system.

If using MongoDB Compass or Atlas, replace MONGO_URI with your connection string.

📦 Install Dependencies

npm install

▶️ Run Backend Server (Dev)

npm run dev

Backend will run on:

http://localhost:4000



🎨 Frontend Setup
📂 Navigate to Frontend

cd frontend

🧪 Create .env File

Create a file named .env in the frontend folder:

frontend/.env

VITE_BASE_URL=http://localhost:4000

📦 Install Dependencies
npm install

▶️ Run Frontend Dev Server
npm run dev

Frontend will run on something like:

http://localhost:5173
