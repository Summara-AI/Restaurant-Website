# Ember & Crest — Luxury Restaurant Website

A full-stack MERN application for **Ember & Crest**, a high-end restaurant in Austin, Texas. Built with React (Vite), Node.js, Express, and MongoDB.

## Tech Stack

- **Frontend:** React, Vite, React Router v6, Tailwind CSS, Framer Motion, Axios, React Hook Form, Zod, React Hot Toast, Lucide React
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, nodemailer, express-validator
- **Fonts:** Playfair Display, Cormorant Garamond, Jost (Google Fonts)

## Design

- **Colors:** Black (#0A0A0A, #111111), Deep Crimson Red (#8B0000, #C0392B), Gold (#C9A84C), Off-White (#F5F0E8)
- **Style:** Dark luxury aesthetic, wood-fire cooking theme

## Project Structure

```
/client          → React frontend (Vite)
/server          → Node/Express backend
  /models        → Mongoose models
  /routes        → Express routes
  /controllers   → Business logic
  /middleware    → Auth, validation, error handling
  /utils         → Email, booking ref generation
```

## Setup

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone and install

```bash
cd "Resturant project"
npm install --prefix client
npm install --prefix server
```

### 2. Environment variables

Copy `.env.example` to `.env` in the project root and update:

```bash
cp .env.example .env
```

Edit `.env`:

- `MONGO_URI` — MongoDB connection string (default: `mongodb://127.0.0.1:27017/ember-crest`)
- `JWT_SECRET` — Secret for JWT (use a strong value in production)
- `EMAIL_USER` / `EMAIL_PASS` — Gmail credentials for confirmation emails (optional; app works without them)

### 3. Seed the database

```bash
cd server
node seed.js
```

This creates:

- Admin user: `admin@emberandcrest.com` / `Admin@1234`
- 30 menu items
- 6 blog posts
- 5 sample reservations
- 3 event inquiries

### 4. Run the app

**Terminal 1 — Backend:**

```bash
cd server
npm run dev
```

**Terminal 2 — Frontend:**

```bash
cd client
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, about, signatures, testimonials, reservation banner |
| `/menu` | Full menu with categories and filters |
| `/about` | Story, philosophy, team, partners, awards |
| `/reservations` | Multi-step reservation form |
| `/events` | Private dining, packages, inquiry form |
| `/gallery` | Masonry gallery with lightbox |
| `/contact` | Contact form and map |
| `/journal` | Blog listing |
| `/journal/:slug` | Blog post |
| `/login` | Admin login |
| `/admin` | Admin dashboard (protected) |

## Admin Panel

- **Dashboard:** Stats (reservations, inquiries, contacts)
- **Reservations:** List, filter, update status, delete
- **Event Inquiries:** List, update status
- **Contact Messages:** List
- **Menu:** CRUD menu items
- **Blog:** CRUD posts
- **Settings:** Restaurant info (placeholder)

Login: `admin@emberandcrest.com` / `Admin@1234`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/me` | Current user |
| POST | `/api/reservations` | Create reservation |
| GET | `/api/reservations` | List (admin) |
| GET | `/api/reservations/availability` | Check availability |
| GET | `/api/menu` | List menu |
| POST | `/api/events` | Event inquiry |
| POST | `/api/contact` | Contact form |
| GET | `/api/blog` | List posts |
| GET | `/api/blog/:slug` | Single post |

## Restaurant Details

- **Name:** Ember & Crest
- **Tagline:** Where Fire Meets Flavor
- **Address:** 123 Congress Ave, Austin, TX 78701
- **Phone:** (512) 555-0192
- **Email:** hello@emberandcrest.com

## License

ISC
