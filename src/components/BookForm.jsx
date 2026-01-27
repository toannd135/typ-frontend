import React, { useState, useEffect } from 'react'
import './BookForm.css'

function BookForm({ book, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    publishedYear: new Date().getFullYear()
  })

  useEffect(() => {
    if (book) {
      setFormData(book)
    }
  }, [book])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'publishedYear' ? parseInt(value) : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{book ? 'Edit Book' : 'Add New Book'}</h2>

      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter book title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="author">Author *</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Enter author name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="isbn">ISBN *</label>
        <input
          type="text"
          id="isbn"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          placeholder="Enter ISBN"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="publishedYear">Published Year *</label>
        <input
          type="number"
          id="publishedYear"
          name="publishedYear"
          value={formData.publishedYear}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {book ? 'Update Book' : 'Add Book'}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default BookForm
