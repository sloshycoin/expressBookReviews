const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  // Check if username exists and meets minimum requirements
  return username && typeof username === 'string' && username.trim().length > 0;
}

const authenticatedUser = (username, password)=>{ //returns boolean
  // Find user in our records and check if password matches
  const user = users.find(user => user.username === username && user.password === password);
  return !!user; // Convert to boolean
}

//only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  
  // Validate request body
  if (!username || !password) {
    return res.status(400).json({message: "Username and password are required"});
  }
  
  // Check if user is registered and credentials match
  if (authenticatedUser(username, password)) {
    // Generate JWT token
    const token = jwt.sign({
      username: username,
      role: 'customer'
    }, "fingerprint_customer", { expiresIn: '24h' });
    
    return res.status(200).json({
      message: "Login successful",
      token: token
    });
  }
  
  return res.status(401).json({message: "Invalid credentials"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const { review } = req.body;
  const username = req.user.username;
  
  // Validate input
  if (!review) {
    return res.status(400).json({message: "Review content is required"});
  }
  
  // Check if book exists
  if (!books[isbn]) {
    return res.status(404).json({message: "Book not found"});
  }
  
  // Add or update the review
  books[isbn].reviews[username] = review;
  
  return res.status(200).json({
    message: "Review added/updated successfully",
    book: books[isbn]
  });
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user.username;
  
  // Check if book exists
  if (!books[isbn]) {
    return res.status(404).json({message: "Book not found"});
  }
  
  // Check if user has posted a review for this book
  if (!books[isbn].reviews[username]) {
    return res.status(404).json({message: "Review not found"});
  }
  
  // Delete the review
  delete books[isbn].reviews[username];
  
  return res.status(200).json({
    message: "Review deleted successfully"
  });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
