# Vouchify Deployment Guide

This guide will help you deploy the Vouchify application on Render.

## Prerequisites

1. A GitHub account
2. A Render account
3. Your code pushed to a GitHub repository

## Backend Deployment (Django)

### 1. Create a new Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `vouchify-backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn vouchify_backend.wsgi:application`
   - **Root Directory**: `backend`

### 2. Environment Variables

Add these environment variables in Render:

- `DJANGO_SECRET_KEY`: Generate a secure secret key
- `DEBUG`: `false`
- `ALLOWED_HOSTS`: `vouchify-backend.onrender.com`
- `DATABASE_URL`: Will be provided by Render's PostgreSQL service

### 3. Create PostgreSQL Database

1. In Render dashboard, create a new PostgreSQL database
2. Name it `vouchify-db`
3. Copy the connection string and add it as `DATABASE_URL` environment variable

## Frontend Deployment (React)

### 1. Create a new Static Site on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" and select "Static Site"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `vouchify-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Root Directory**: `frontend`

### 2. Environment Variables

Add this environment variable:
- `VITE_API_URL`: `https://vouchify-backend.onrender.com/api`

## Firebase Configuration

1. Update your Firebase project settings to allow your Render domains
2. Add your Render frontend URL to Firebase Auth authorized domains
3. Update Firebase Storage rules if needed

## Post-Deployment

1. Run database migrations on the backend
2. Create a superuser for Django admin
3. Test all functionality
4. Update CORS settings if needed

## Troubleshooting

- Check Render logs for build errors
- Verify environment variables are set correctly
- Ensure all dependencies are in requirements.txt
- Check CORS settings for frontend-backend communication

## Local Development

For local development, create a `.env` file in the backend directory:

```
DJANGO_SECRET_KEY=your-secret-key
DEBUG=true
ALLOWED_HOSTS=127.0.0.1,localhost
```

And in the frontend directory:

```
VITE_API_URL=http://127.0.0.1:8000/api
``` 