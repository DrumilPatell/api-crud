# Student CRUD App

Full-stack student management with Django REST API and React frontend.

## Features

- **Backend:** Django REST API with CRUD operations, bulk create/delete, CORS enabled
- **Frontend:** React + Vite + Tailwind with light/dark mode, form validation, responsive design
- **Database:** Student model with roll_no (unique, alphanumeric), name, age, city

## Quick Start

### Backend
```powershell
cd backend
python manage.py migrate
python manage.py runserver
```
Runs at `http://127.0.0.1:8000`

### Frontend
```powershell
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students/` | List all students |
| POST | `/api/students/bulk/` | Create student(s) - single object or array |
| PUT | `/api/students/{id}/` | Update student |
| DELETE | `/api/students/{id}/delete/` | Delete student |
| POST | `/api/students/bulk/delete/` | Delete multiple - `{"ids": [1,2,3]}` |

### Example Request
```json
POST /api/students/bulk/
{
  "roll_no": "CS101",
  "name": "John Doe",
  "age": 20,
  "city": "New York"
}
```

## Tech Stack

**Backend:** Django 6.0, DRF 3.16, SQLite  
**Frontend:** React 18, Vite 7, Tailwind CSS 4

## License

MIT
