import React, { useState, useEffect } from 'react'
import './App.css'
import BookList from './components/BookList'
import BookForm from './components/BookForm'
import { bookService } from './services/bookService'

function App() {
  const [books, setBooks] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingBook, setEditingBook] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await bookService.getAll()
      setBooks(data)
    } catch (err) {
      setError('Failed to load books')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    setEditingBook(null)
    setIsFormOpen(true)
  }

  const handleEdit = (book) => {
    setEditingBook(book)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingBook(null)
  }

  const handleFormSubmit = async (formData) => {
    try {
      if (editingBook) {
        await bookService.update(editingBook.id, formData)
      } else {
        await bookService.create(formData)
      }
      await fetchBooks()
      handleFormClose()
    } catch (err) {
      setError('Failed to save book')
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this book?')) {
      try {
        await bookService.delete(id)
        await fetchBooks()
      } catch (err) {
        setError('Failed to delete book')
      }
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 Book Management System</h1>
      </header>

      <main className="app-main">
        <div className="controls">
          <button className="btn btn-primary" onClick={handleAdd}>
            + Add New Book
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {isFormOpen && (
          <div className="modal-overlay" onClick={handleFormClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={handleFormClose}>×</button>
              <BookForm
                book={editingBook}
                onSubmit={handleFormSubmit}
                onCancel={handleFormClose}
              />
            </div>
          </div>
        )}

        {loading ? (
          <div className="loading">Loading books...</div>
        ) : (
          <BookList
            books={books}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  )
}

export default App
