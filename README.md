# StartupMap

A full-stack web app where startups can discover and collaborate 
with nearby businesses.

## Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Express, PostgreSQL, Sequelize, JWT Auth

## Features
- User registration and login with JWT authentication
- Create and manage business profiles
- Browse and search verified startups
- Send and respond to collaboration requests
- Notification system

## Project Structure
├── startup-ecosystem-backend/   → Express REST API
└── startup-ecosystem-frontend/  → React + TypeScript SPA

## How to Run

### Backend
cd startup-ecosystem-backend
npm install
cp .env.example .env
# fill in your database credentials in .env
npm run dev

### Frontend
cd startup-ecosystem-frontend
npm install
cp .env.example .env
npm run dev

### Seed the database (optional)
cd startup-ecosystem-backend
node seed.js

Demo credentials after seeding:
- Email: sarah@demo.com / Password: demo123
- Email: michael@demo.com / Password: demo123

## API Endpoints
- POST /api/auth/register
- POST /api/auth/login
- GET  /api/businesses
- POST /api/businesses
- GET  /api/collaborations/received
- POST /api/collaborations
- GET  /api/notifications
