# Student CRUD App

A simple full-stack student CRUD application with Django backend and React + Vite frontend.

## Backend (Django)

Located in `backend/`

### Setup

```powershell
cd backend
..\\.venv\Scripts\python.exe manage.py runserver
```

Server runs at `http://127.0.0.1:8000`

### API Endpoints

- `GET /api/students/` – list all students
- `POST /api/students/bulk/` – create one or many students (accepts object or array)
- `PUT /api/students/{id}/` – update a student
- `DELETE /api/students/{id}/delete/` – delete a student

## Frontend (React + Vite + Tailwind)

Located in `frontend/`

### Setup

```powershell
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`
