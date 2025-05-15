# 📝 Task Management App

A modern task management application built with **Next.js** (frontend), **Express.js** (backend), and **MongoDB** (database). The entire application is containerized using **Docker Compose** for easy deployment and local development.

## 🧰 Tech Stack

- **Frontend**: Next.js
- **Backend**: Express.js
- **Database**: MongoDB
- **Containerization**: Docker & Docker Compose

## 📁 Project Structure

```
├── frontend/ # Next.js frontend application
├── backend/ # Express.js API backend
└── docker-compose.yml
```

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 1. Clone the repository

```bash
git clone https://github.com/pwenill/task-app
docker-compose up --build
```

### 2. Start the application

```bash
docker-compose up --build
```

### 3. Access the services

- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- MongoDB: available at localhost:27017

## ⚙️ Environment Variables

### Frontend (frontend/)

```bash
NEXT_PUBLIC_URL_BACKEND=http://localhost:4000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
PORT=3000
```

### Backend (backend/)

```bash
MONGODB=mongodb://root:password@127.0.0.1:27017/taskdb?authSource=admin
BACKEND_DOMAIN=localhost
FRONTEND_URL=http://localhost:3000
PORT=4000
```
