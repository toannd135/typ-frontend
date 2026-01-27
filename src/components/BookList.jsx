import React from 'react'
import './BookList.css'

function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <p>📖 No books found. Add your first book!</p>
      </div>
    )
  }

  return (
    <div className="book-list">
      <table className="books-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Published Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{book.publishedYear}</td>
              <td className="actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => onEdit(book)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BookList
