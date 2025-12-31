# Student CRUD App

A full-stack student management application with Django REST API backend and minimal and simple frontend.

## Features

### Backend (Django REST Framework)
- ✅ Student model (name, age, city)
- ✅ Complete CRUD operations
- ✅ Bulk create (single or multiple students)
- ✅ Bulk delete (multiple students by IDs)
- ✅ CORS enabled for cross-origin requests
- ✅ SQLite database
- ✅ JSON response messages

### Frontend (React + Vite + Tailwind)
- ✅ Clean table-based UI for student data
- ✅ Light/Dark mode toggle (persists in localStorage)
- ✅ Form validation:
  - Name & City: Letters only, auto-capitalize first letter
  - Age: Numbers only, max 100
- ✅ Real-time error messages with visual feedback
- ✅ Add, Edit, Delete students with confirmation
- ✅ Auto-refresh after operations
- ✅ Responsive design
- ✅ Custom favicon

## Setup & Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```powershell
cd backend
```

2. Activate virtual environment (if not activated):
```powershell
..\.venv\Scripts\activate
```

3. Install dependencies (if needed):
```powershell
pip install django djangorestframework django-cors-headers
```

4. Run migrations:
```powershell
python manage.py migrate
```

5. Start server:
```powershell
python manage.py runserver
```

Server runs at `http://127.0.0.1:8000`

### Frontend Setup

1. Navigate to frontend folder:
```powershell
cd frontend
```

2. Install dependencies:
```powershell
npm install
```

3. Start dev server:
```powershell
npm run dev
```

App runs at `http://localhost:5173`

## API Endpoints

### Students

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/students/` | List all students | - |
| POST | `/api/students/bulk/` | Create student(s) | `{"name": "John", "age": 20, "city": "NYC"}` or `[{...}, {...}]` |
| PUT | `/api/students/{id}/` | Update a student | `{"name": "Jane", "age": 21, "city": "LA"}` |
| DELETE | `/api/students/{id}/delete/` | Delete a student | - |
| POST | `/api/students/bulk/delete/` | Delete multiple students | `{"ids": [1, 2, 3]}` |

### Root
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API info and endpoints |

## Testing with Postman

**Add Single Student:**
```json
POST http://127.0.0.1:8000/api/students/bulk/
Content-Type: application/json

{
  "name": "John Doe",
  "age": 20,
  "city": "New York"
}
```

**Add Multiple Students:**
```json
POST http://127.0.0.1:8000/api/students/bulk/
Content-Type: application/json

[
  {"name": "Jane Smith", "age": 22, "city": "London"},
  {"name": "Bob Johnson", "age": 19, "city": "Paris"}
]
```

**Bulk Delete:**
```json
POST http://127.0.0.1:8000/api/students/bulk/delete/
Content-Type: application/json

{
  "ids": [1, 2, 3]
}
```

## Technologies Used

**Backend:**
- Django 6.0
- Django REST Framework 3.16
- django-cors-headers
- SQLite

**Frontend:**
- React 18
- Vite 7
- Tailwind CSS 4
- Fetch API

## License

MIT
