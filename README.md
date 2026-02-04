# 🏀 NBA Teams & Conferences App

A full-stack React application to browse NBA teams, view their conferences, and explore team rosters with player information.

## ✨ Features

- 🏀 View all 30 NBA teams with logos
- 🔍 Filter teams by conference (Eastern, Western, or All)
- 🔎 Search teams by name or city
- 📊 Sort teams by name or conference
- 👥 View team rosters with player photos, names, positions, and jersey numbers
- 📱 Fully responsive design
- 🎨 Beautiful, modern UI with smooth animations

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install all dependencies
npm run install:all
```

### Run Development Servers

```bash
# Run both frontend and backend
npm run dev
```

Or run separately:
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

### Access the App

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## 📦 Project Structure

```
React App/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service functions
│   │   └── App.jsx        # Main app component
│   └── package.json
├── backend/           # Express.js backend API
│   ├── routes/        # API routes
│   ├── data/          # JSON data file (30 teams with rosters)
│   └── server.js      # Express server
└── package.json       # Root package.json
```

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy Options:

**Option 1: Render (Backend) + Vercel (Frontend)** ⭐ Recommended
- Backend: https://render.com (Free tier)
- Frontend: https://vercel.com (Free tier)

**Option 2: Both on Vercel**
- Deploy backend and frontend separately on Vercel

## 📡 API Endpoints

- `GET /api/health` - Health check
- `GET /api/teams` - Get all teams
- `GET /api/teams/:id` - Get specific team with roster
- `GET /api/teams/conference/:conference` - Get teams by conference
- `GET /api/conferences` - Get all conferences with counts

## 🛠️ Tech Stack

- **Frontend**: React, React Router, Vite
- **Backend**: Node.js, Express.js
- **Data**: JSON file (30 NBA teams with complete rosters)
- **Styling**: CSS with animations and glassmorphism effects

## 📝 Environment Variables

### Backend (.env)
```
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

## 🎯 Features in Detail

### Home Page
- Statistics dashboard (Total teams, Eastern/Western counts)
- Conference filter buttons
- Search bar for teams
- Sort options (Name A-Z, Z-A, Conference)
- Grid of team cards with logos

### Team Detail Page
- Team logo and information
- Complete roster with player photos
- Player names, positions, and jersey numbers
- Other teams in the same conference

## 📄 License

This project is open source and available for educational purposes.

---

**Built with ❤️ for NBA fans**
