# 🚀 Deployment Guide - NBA Teams & Conferences App

Complete guide to deploy your app to production and get a live URL.

---

## 📋 Prerequisites

1. **GitHub Account** - To host your code
2. **Render Account** - For backend (free): https://render.com
3. **Vercel Account** - For frontend (free): https://vercel.com

---

## 🔧 Step 1: Push Code to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "NBA Teams App - Ready for deployment"
   ```

2. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Create a new repository (e.g., `nba-teams-app`)
   - **Don't** initialize with README

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/nba-teams-app.git
   git branch -M main
   git push -u origin main
   ```

---

## 🖥️ Step 2: Deploy Backend to Render

### 2.1 Create Render Account
- Go to https://render.com
- Sign up with GitHub (recommended)

### 2.2 Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select your repository

### 2.3 Configure Backend
- **Name**: `nba-backend` (or any name)
- **Environment**: `Node`
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: Leave empty
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && node server.js`

### 2.4 Set Environment Variables
Click "Advanced" → "Environment Variables" and add:
```
NODE_ENV = production
PORT = 3001
FRONTEND_URL = https://your-frontend.vercel.app
```
*(Update FRONTEND_URL after deploying frontend in Step 3)*

### 2.5 Deploy
- Click **"Create Web Service"**
- Wait 2-3 minutes for deployment
- **Copy your backend URL** (e.g., `https://nba-backend.onrender.com`)
- ⚠️ **Note**: Free tier spins down after 15 min of inactivity (first request may be slow)

---

## 🎨 Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account
- Go to https://vercel.com
- Sign up with GitHub

### 3.2 Import Project
1. Click **"Add New"** → **"Project"**
2. Import your GitHub repository
3. Select your repository

### 3.3 Configure Frontend
- **Framework Preset**: `Vite`
- **Root Directory**: `frontend` ⚠️ **Important!**
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `dist` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### 3.4 Set Environment Variables
Click "Environment Variables" and add:
```
VITE_API_URL = https://your-backend-url.onrender.com/api
```
*(Use the backend URL from Step 2.5)*

### 3.5 Deploy
- Click **"Deploy"**
- Wait 1-2 minutes
- **Copy your frontend URL** (e.g., `https://nba-teams-app.vercel.app`)

---

## 🔄 Step 4: Update Backend CORS

1. Go back to **Render dashboard**
2. Go to your backend service
3. Click **"Environment"** tab
4. Update `FRONTEND_URL` with your Vercel URL:
   ```
   FRONTEND_URL = https://nba-teams-app.vercel.app
   ```
5. Click **"Save Changes"**
6. Render will automatically redeploy

---

## ✅ Step 5: Verify Deployment

### Test Backend:
Visit: `https://your-backend.onrender.com/api/health`
- Should return: `{"status":"OK","message":"NBA API is running"}`

### Test Frontend:
Visit: `https://your-frontend.vercel.app`
- Should show the NBA Teams app
- Click on a team
- Verify roster loads correctly

---

## 🎉 You're Done!

**Your app is now live!** 

**Submit this URL**: `https://your-frontend.vercel.app`

---

## 🔧 Troubleshooting

### Backend Issues:

**CORS Errors:**
- Make sure `FRONTEND_URL` in Render matches your Vercel URL exactly
- Include `https://` in the URL
- No trailing slash

**Data Not Loading:**
- Verify `backend/data/nba-teams.json` is in your GitHub repo
- Check Render logs for errors

**Slow First Request:**
- Free tier on Render spins down after inactivity
- First request after 15 min takes ~30 seconds to wake up
- This is normal for free tier

### Frontend Issues:

**API Connection Errors:**
- Verify `VITE_API_URL` is set correctly in Vercel
- Should be: `https://your-backend.onrender.com/api`
- Check browser console (F12) for specific errors

**404 Errors on Routes:**
- Vercel should auto-detect React Router
- If not, add `vercel.json` with rewrites (already included)

**Build Errors:**
- Check Vercel build logs
- Ensure all dependencies are in `package.json`

---

## 📝 Alternative: Deploy Both to Vercel

If you prefer to use only Vercel:

### Backend on Vercel:
1. Create new Vercel project
2. Root Directory: `backend`
3. Framework: Other
4. Build Command: (leave empty)
5. Output Directory: (leave empty)
6. Install Command: `npm install`

### Frontend on Vercel:
1. Create new Vercel project
2. Root Directory: `frontend`
3. Framework: Vite
4. Build Command: `npm run build`
5. Output Directory: `dist`

**Note**: Vercel free tier has limitations for backend APIs. Render is recommended for backend.

---

## 🌐 Your Final URLs

After deployment:
- **Backend API**: `https://your-backend.onrender.com`
- **Frontend App**: `https://your-frontend.vercel.app` ← **Submit this one!**

---

## 📦 What Gets Deployed

✅ **Backend includes:**
- All route files
- `nba-teams.json` with all 30 teams and rosters
- Server configuration

✅ **Frontend includes:**
- All React components
- Styling and assets
- Build output (dist folder)

---

## 🎯 Next Steps

1. Test your deployed app thoroughly
2. Share the frontend URL
3. Monitor Render/Vercel dashboards for any issues
4. Enjoy your live NBA Teams app! 🏀

---

**Need Help?** Check the logs in Render/Vercel dashboards for detailed error messages.
