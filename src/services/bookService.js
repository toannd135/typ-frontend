import axios from 'axios'

const API_BASE_URL = '/api/books'

export const bookService = {
  getAll: async () => {
    try {
      const response = await axios.get(API_BASE_URL)
      return response.data
    } catch (error) {
      console.error('Error fetching books:', error)
      throw error
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching book:', error)
      throw error
    }
  },

  create: async (bookData) => {
    try {
      const response = await axios.post(API_BASE_URL, bookData)
      return response.data
    } catch (error) {
      console.error('Error creating book:', error)
      throw error
    }
  },

  update: async (id, bookData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, bookData)
      return response.data
    } catch (error) {
      console.error('Error updating book:', error)
      throw error
    }
  },

  delete: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`)
    } catch (error) {
      console.error('Error deleting book:', error)
      throw error
    }
  }
}
