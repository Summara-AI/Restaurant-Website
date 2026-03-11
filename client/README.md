# 🍽️ Restaurant Website

A full-stack restaurant web application built with the **MERN Stack** (MongoDB, Express, React, Node.js). Features include a dynamic menu, blog/journal, and more.

---

## 🚀 Live Demo

- **Frontend:** [restaurant-website.vercel.app](https://restaurant-website.vercel.app)
- **Backend:** *(coming soon on Render)*

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Deployment (Frontend) | Vercel |
| Deployment (Backend) | Render |

---

## 📁 Project Structure

```
Restaurant-Website/
├── client/          # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│   ├── public/
│   └── package.json
├── server/          # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
├── .env.example
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js installed
- MongoDB Atlas account
- Git

### Clone the Repository

```bash
git clone https://github.com/Summara-AI/Restaurant-Website.git
cd Restaurant-Website
```

### Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:

```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

Start the backend:

```bash
npm run dev
```

### Setup Frontend

```bash
cd client
npm install
npm run dev
```

Open your browser and go to:

```
http://localhost:5173
```

---

## 🌐 Deployment

### Frontend (Vercel)
- Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `dist`

### Backend (Render)
- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `node server.js`

---

## 📌 Features

- 🍕 Dynamic Menu Page
- 📝 Journal / Blog Page
- 📱 Responsive Design
- 🔗 REST API with Express
- 🗄️ MongoDB Database

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Summara-AI**  
GitHub: [@Summara-AI](https://github.com/Summara-AI)
