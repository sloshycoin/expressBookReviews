/**
 * Book Review Application - Client-side API Implementation
 * This module contains Promise-based API calls for the Book Review application
 */

// Base URL for the API
const BASE_URL = 'http://localhost:5000';

// Axios is expected to be included in the HTML file that uses this module

/**
 * Get all books from the API
 * @returns {Promise} Promise object representing the books
 */
async function getAllBooks() {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
}

/**
 * Get a specific book by ISBN
 * @param {string} isbn - The ISBN of the book to fetch
 * @returns {Promise} Promise object representing the book
 */
async function getBookByISBN(isbn) {
  try {
    const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with ISBN ${isbn}:`, error);
    throw error;
  }
}

/**
 * Get books by author
 * @param {string} author - The author name to search for
 * @returns {Promise} Promise object representing books by the specified author
 */
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`${BASE_URL}/author/${author}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching books by author ${author}:`, error);
    throw error;
  }
}

/**
 * Get books by title
 * @param {string} title - The title to search for
 * @returns {Promise} Promise object representing books with the specified title
 */
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`${BASE_URL}/title/${title}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching books with title ${title}:`, error);
    throw error;
  }
}

/**
 * Get reviews for a specific book by ISBN
 * @param {string} isbn - The ISBN of the book to get reviews for
 * @returns {Promise} Promise object representing the book reviews
 */
async function getBookReviews(isbn) {
  try {
    const response = await axios.get(`${BASE_URL}/review/${isbn}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reviews for book ${isbn}:`, error);
    throw error;
  }
}

/**
 * Register a new user
 * @param {string} username - The username for registration
 * @param {string} password - The password for registration
 * @returns {Promise} Promise object representing the registration result
 */
async function registerUser(username, password) {
  try {
    const response = await axios.post(`${BASE_URL}/register`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

/**
 * Login a user and get a JWT token
 * @param {string} username - The username for login
 * @param {string} password - The password for login
 * @returns {Promise} Promise object representing the login result with JWT token
 */
async function loginUser(username, password) {
  try {
    const response = await axios.post(`${BASE_URL}/customer/login`, { username, password });
    // Store the token in localStorage for future authenticated requests
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

/**
 * Add or update a book review (authenticated)
 * @param {string} isbn - The ISBN of the book to review
 * @param {string} review - The review content
 * @returns {Promise} Promise object representing the add/update result
 */
async function addOrUpdateReview(isbn, review) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found. Please login first.');
    }
    
    const response = await axios.put(`${BASE_URL}/customer/auth/review/${isbn}`, 
      { review },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error(`Error adding/updating review for book ${isbn}:`, error);
    throw error;
  }
}

/**
 * Delete a book review (authenticated)
 * @param {string} isbn - The ISBN of the book to delete review for
 * @returns {Promise} Promise object representing the deletion result
 */
async function deleteReview(isbn) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found. Please login first.');
    }
    
    const response = await axios.delete(`${BASE_URL}/customer/auth/review/${isbn}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting review for book ${isbn}:`, error);
    throw error;
  }
}

/**
 * Logout user - Removes token from localStorage
 */
function logoutUser() {
  localStorage.removeItem('token');
}

// Export functions if using as a module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getAllBooks,
    getBookByISBN,
    getBooksByAuthor,
    getBooksByTitle,
    getBookReviews,
    registerUser,
    loginUser,
    addOrUpdateReview,
    deleteReview,
    logoutUser
  };
}