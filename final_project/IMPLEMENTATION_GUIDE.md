# Book Review Application Implementation Guide

This guide provides a structured approach to completing the Book Review application, breaking down the tasks into manageable steps.

## Prerequisites

- Node.js and npm installed
- Basic understanding of Express.js
- Knowledge of RESTful APIs
- Familiarity with JWT (JSON Web Tokens)

## Getting Started

**Setup the Project**
   - Clone the repository
   - Run `npm install` to install dependencies
   - Start the server with `npm start` (uses nodemon)

## Backend Implementation Tasks

### Basic Authentication

1. **Implement JWT Authentication Middleware**
   - Complete the auth middleware in `index.js` to validate JWT tokens
   - Test the authentication flow with Postman

### Public Routes Implementation

2. **Get All Books**
   - Complete the GET endpoint in `general.js` to return all available books
   - Format the response using JSON.stringify for better readability

3. **Get Book by ISBN**
   - Complete the GET `/isbn/:isbn` endpoint to fetch a book by its ISBN
   - Handle cases where the ISBN doesn't exist

4. **Get Books by Author**
   - Complete the GET `/author/:author` endpoint to fetch books by a specific author
   - Implement proper filtering logic

5. **Get Books by Title**
   - Complete the GET `/title/:title` endpoint to fetch books by title
   - Ensure proper error handling for missing titles

6. **Get Book Reviews**
   - Complete the GET `/review/:isbn` endpoint to fetch reviews for a specific book
   - Return appropriate messages when no reviews exist

### User Authentication and Registration

7. **User Registration**
   - Implement the registration endpoint to create new users
   - Add validation for username/password
   - Handle duplicate username errors

8. **User Login**
   - Complete the login endpoint to authenticate users
   - Generate and return JWT tokens upon successful login
   - Implement proper error handling for invalid credentials

### Authenticated User Routes

9. **Add/Modify Book Review**
   - Implement functionality to allow authenticated users to post reviews
   - Handle review updates for existing reviews by the same user
   - Ensure reviews are associated with the correct user

10. **Delete Book Review**
    - Implement the DELETE endpoint to remove a user's review
    - Ensure users can only delete their own reviews
    - Return appropriate success/error messages

### Client-Side Implementation

11. **Implement Promise-based API Calls**
    - Complete the `general.js` file to use Promise callbacks or async/await with Axios
    - Implement functions to get all books
    - Implement functions to get books by ISBN
    - Implement functions to get books by author
    - Implement functions to get books by title

## Testing

12. **Test All Endpoints**
    - Use Postman to test each endpoint
    - Capture screenshots as required for the assignment submission
    - Verify both success and error scenarios

## Documentation

13. **Document Your API**
    - Create clear documentation of all endpoints
    - Include sample request/response for each endpoint

## Submission

14. **Organize Screenshots**
    - Ensure all required screenshots are properly named according to the requirements
    - Place them in a designated folder for submission

Remember to commit your code frequently and test thoroughly after implementing each feature.
