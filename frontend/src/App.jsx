import { useState, useEffect } from 'react'

const API = 'http://127.0.0.1:8000/api'

function App() {
  const [students, setStudents] = useState([])
  const [form, setForm] = useState({ roll_no: '', name: '', age: '', city: '' })
  const [editId, setEditId] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [rollNoError, setRollNoError] = useState('')
  const [ageError, setAgeError] = useState('')
  const [nameError, setNameError] = useState('')
  const [cityError, setCityError] = useState('')
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const fetchStudents = () => {
    fetch(`${API}/students/`)
      .then(res => res.json())
      .then(data => setStudents(data))
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    let processedValue = value
    
    if (name === 'name' || name === 'city') {
      if (value.length > 0) {
        processedValue = value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
    
    if (name === 'roll_no') {
      if (processedValue && !/^[a-zA-Z0-9]*$/.test(processedValue)) {
        setRollNoError('Only letters and numbers are allowed')
        return
      }
      setRollNoError('')
    }
    if (name === 'name') {
      if (processedValue && !/^[a-zA-Z\s]*$/.test(processedValue)) {
        setNameError('Only letters are allowed')
        return
      }
      setNameError('')
    }
    if (name === 'age') {
      if (value && !/^\d+$/.test(value)) {
        setAgeError('Only numbers are allowed')
        return
      }
      if (value && parseInt(value) > 100) {
        setAgeError('Age cannot be more than 100')
        return
      }
      setAgeError('')
    }
    if (name === 'city') {
      if (processedValue && !/^[a-zA-Z\s]*$/.test(processedValue)) {
        setCityError('Only letters are allowed')
        return
      }
      setCityError('')
    }
    setForm({ ...form, [name]: name === 'age' ? value : processedValue })
  }

  const handleCancel = () => {
    setEditId(null)
    setForm({ roll_no: '', name: '', age: '', city: '' })
    setRollNoError('')
    setAgeError('')
    setNameError('')
    setCityError('')
  }

  const handleAdd = () => {
    if (!form.roll_no || !form.name || !form.age || !form.city) return
    fetch(`${API}/students/bulk/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(() => {
      handleCancel()
      fetchStudents()
    })
  }

  const handleEdit = student => {
    setEditId(student.id)
    setForm({ roll_no: student.roll_no, name: student.name, age: student.age, city: student.city })
  }

  const handleUpdate = () => {
    fetch(`${API}/students/${editId}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(() => {
      handleCancel()
      fetchStudents()
    })
  }

  const handleDelete = id => {
    fetch(`${API}/students/${id}/delete/`, { method: 'DELETE' }).then(() => {
      setDeleteConfirm(null)
      fetchStudents()
    })
  }

  return (
    <div className={`min-h-screen p-4 sm:p-6 md:p-8 transition-colors duration-300 ${darkMode ? 'bg-slate-900' : 'bg-linear-to-br from-slate-50 to-slate-200'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>Student Management</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 sm:p-3 rounded-full transition-all duration-300 ${darkMode ? 'bg-yellow-400 text-slate-900 hover:bg-yellow-300' : 'bg-slate-800 text-white hover:bg-slate-700'}`}
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>

        <div className={`rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 transition-colors duration-300 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
          <h2 className={`text-base sm:text-lg font-semibold mb-4 ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>
            {editId ? 'Edit Student' : 'Add New Student'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div>
              <input
                name="roll_no"
                placeholder="Roll No"
                value={form.roll_no}
                onChange={handleChange}
                className={`border rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-colors ${darkMode ? 'bg-slate-700 text-white placeholder-slate-400' : 'bg-white'} ${rollNoError ? 'border-red-500' : darkMode ? 'border-slate-600' : 'border-slate-300'}`}
              />
              {rollNoError && <p className="text-red-500 text-xs sm:text-sm mt-1">{rollNoError}</p>}
            </div>
            <div>
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className={`border rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-colors ${darkMode ? 'bg-slate-700 text-white placeholder-slate-400' : 'bg-white'} ${nameError ? 'border-red-500' : darkMode ? 'border-slate-600' : 'border-slate-300'}`}
              />
              {nameError && <p className="text-red-500 text-xs sm:text-sm mt-1">{nameError}</p>}
            </div>
            <div>
              <input
                name="age"
                placeholder="Age"
                value={form.age}
                onChange={handleChange}
                className={`border rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-colors ${darkMode ? 'bg-slate-700 text-white placeholder-slate-400' : 'bg-white'} ${ageError ? 'border-red-500' : darkMode ? 'border-slate-600' : 'border-slate-300'}`}
              />
              {ageError && <p className="text-red-500 text-xs sm:text-sm mt-1">{ageError}</p>}
            </div>
            <div>
              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className={`border rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-colors ${darkMode ? 'bg-slate-700 text-white placeholder-slate-400' : 'bg-white'} ${cityError ? 'border-red-500' : darkMode ? 'border-slate-600' : 'border-slate-300'}`}
              />
              {cityError && <p className="text-red-500 text-xs sm:text-sm mt-1">{cityError}</p>}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3">
            {editId ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
                >
                  Update
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-slate-400 hover:bg-slate-500 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleAdd}
                className="bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold px-8 sm:px-10 py-2.5 sm:py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Student
              </button>
            )}
          </div>
        </div>

        <div className={`rounded-xl shadow-lg overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
          {students.length === 0 ? (
            <p className={`text-center py-8 text-sm sm:text-base ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>No students yet. Add one above!</p>
          ) : (
            <>
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full">
                  <thead className={`${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <tr>
                      <th className={`px-4 md:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>ID</th>
                      <th className={`px-4 md:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Roll No</th>
                      <th className={`px-4 md:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Name</th>
                      <th className={`px-4 md:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Age</th>
                      <th className={`px-4 md:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>City</th>
                      <th className={`px-4 md:px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${darkMode ? 'divide-slate-700' : 'divide-slate-200'}`}>
                    {students.map(s => (
                      <tr key={s.id} className={`hover:bg-opacity-50 transition-colors ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-50'}`}>
                        <td className={`px-4 md:px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{s.id}</td>
                        <td className={`px-4 md:px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{s.roll_no}</td>
                        <td className={`px-4 md:px-6 py-4 whitespace-nowrap font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>{s.name}</td>
                        <td className={`px-4 md:px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{s.age}</td>
                        <td className={`px-4 md:px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{s.city}</td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-center">
                          {deleteConfirm === s.id ? (
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => handleDelete(s.id)}
                                className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded-lg transition font-medium"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="bg-slate-400 hover:bg-slate-500 text-white text-xs px-3 py-1.5 rounded-lg transition font-medium"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => handleEdit(s)}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-lg transition font-medium"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(s.id)}
                                className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-lg transition font-medium"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="sm:hidden divide-y divide-slate-200 dark:divide-slate-700">
                {students.map(s => (
                  <div key={s.id} className={`p-4 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                          <p className={`font-semibold text-base ${darkMode ? 'text-white' : 'text-slate-900'}`}>{s.name}</p>
                          <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>#{s.roll_no}</p>
                        </div>
                        <div className="flex gap-4 mt-1">
                          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            <span className="font-medium">ID:</span> {s.id}
                          </p>
                          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            <span className="font-medium">Age:</span> {s.age}
                          </p>
                        </div>
                        <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          <span className="font-medium">City:</span> {s.city}
                        </p>
                      </div>
                    </div>
                    {deleteConfirm === s.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition font-medium"
                        >
                          Confirm Delete
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="flex-1 bg-slate-400 hover:bg-slate-500 text-white text-sm px-4 py-2 rounded-lg transition font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(s)}
                          className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm px-4 py-2 rounded-lg transition font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(s.id)}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
