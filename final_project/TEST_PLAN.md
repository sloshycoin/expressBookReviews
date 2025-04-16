# Book Review Application Test Plan

This document outlines comprehensive test scenarios for the Book Review application. Use these test cases with Postman to verify that all functionality works as expected.

## Public Routes Tests

### 1. Get All Books

- **URL:** `GET http://localhost:5000/`
- **Authentication:** None
- **Expected Response:**
  - Status: 200 OK
  - Body: JSON object with all books
  ```json
  {
    "1": {"author": "Chinua Achebe", "title": "Things Fall Apart", "reviews": {}},
    "2": {"author": "Hans Christian Andersen", "title": "Fairy tales", "reviews": {}},
    // More books...
  }
  ```

### 2. Get Book by ISBN

- **URL:** `GET http://localhost:5000/isbn/1`
- **Authentication:** None
- **Expected Response:**
  - Status: 200 OK
  - Body: Book object
  ```json
  {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {}
  }
  ```

- **Test Error Case:**
  - URL: `GET http://localhost:5000/isbn/999`
  - Expected Response:
    - Status: 404 Not Found
    - Body:
    ```json
    {
      "message": "Book not found"
    }
    ```

### 3. Get Books by Author

- **URL:** `GET http://localhost:5000/author/Chinua Achebe`
- **Authentication:** None
- **Expected Response:**
  - Status: 200 OK
  - Body: Array of book objects
  ```json
  [
    {
      "author": "Chinua Achebe",
      "title": "Things Fall Apart",
      "reviews": {}
    }
  ]
  ```

- **Test Error Case:**
  - URL: `GET http://localhost:5000/author/Nonexistent Author`
  - Expected Response:
    - Status: 404 Not Found
    - Body:
    ```json
    {
      "message": "No books found by this author"
    }
    ```

### 4. Get Books by Title

- **URL:** `GET http://localhost:5000/title/Things Fall Apart`
- **Authentication:** None
- **Expected Response:**
  - Status: 200 OK
  - Body: Array of book objects
  ```json
  [
    {
      "author": "Chinua Achebe",
      "title": "Things Fall Apart",
      "reviews": {}
    }
  ]
  ```

- **Partial Title Match Test:**
  - URL: `GET http://localhost:5000/title/Fall`
  - Expected Response:
    - Status: 200 OK
    - Body: Array containing books with "Fall" in the title

- **Test Error Case:**
  - URL: `GET http://localhost:5000/title/Nonexistent Title`
  - Expected Response:
    - Status: 404 Not Found
    - Body:
    ```json
    {
      "message": "No books found with this title"
    }
    ```

### 5. Get Book Reviews

- **URL:** `GET http://localhost:5000/review/1`
- **Authentication:** None
- **Expected Response (with reviews):**
  - Status: 200 OK
  - Body: Object of reviews
  ```json
  {
    "user1": "This is a fantastic book!",
    "user2": "I enjoyed reading this classic."
  }
  ```

- **Expected Response (no reviews):**
  - Status: 200 OK
  - Body:
  ```json
  {
    "message": "No reviews available for this book"
  }
  ```

## User Authentication Tests

### 6. Register User

- **URL:** `POST http://localhost:5000/register`
- **Authentication:** None
- **Request Body:**
  ```json
  {
    "username": "testuser1",
    "password": "password123"
  }
  ```
- **Expected Response:**
  - Status: 201 Created
  - Body:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

- **Test Error Case (Missing Fields):**
  - Request Body:
  ```json
  {
    "username": "testuser1"
  }
  ```
  - Expected Response:
    - Status: 400 Bad Request
    - Body:
    ```json
    {
      "message": "Username and password are required"
    }
    ```

- **Test Error Case (Duplicate Username):**
  - Request Body (after successful registration):
  ```json
  {
    "username": "testuser1",
    "password": "password123"
  }
  ```
  - Expected Response:
    - Status: 409 Conflict
    - Body:
    ```json
    {
      "message": "Username already exists"
    }
    ```

### 7. User Login

- **URL:** `POST http://localhost:5000/customer/login`
- **Authentication:** None
- **Request Body:**
  ```json
  {
    "username": "testuser1",
    "password": "password123"
  }
  ```
- **Expected Response:**
  - Status: 200 OK
  - Body:
  ```json
  {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

- **Test Error Case (Invalid Credentials):**
  - Request Body:
  ```json
  {
    "username": "testuser1",
    "password": "wrongpassword"
  }
  ```
  - Expected Response:
    - Status: 401 Unauthorized
    - Body:
    ```json
    {
      "message": "Invalid credentials"
    }
    ```

## Authenticated Routes Tests

For these tests, you'll need to include the JWT token from the login response in the Authorization header.

### 8. Add Book Review

- **URL:** `PUT http://localhost:5000/customer/auth/review/1`
- **Authentication:** Bearer Token (from login)
- **Headers:**
  ```
  Authorization: Bearer <your-jwt-token>
  ```
- **Request Body:**
  ```json
  {
    "review": "This book changed my perspective on colonial literature."
  }
  ```
- **Expected Response:**
  - Status: 200 OK
  - Body:
  ```json
  {
    "message": "Review added/updated successfully",
    "book": {
      "author": "Chinua Achebe",
      "title": "Things Fall Apart",
      "reviews": {
        "testuser1": "This book changed my perspective on colonial literature."
      }
    }
  }
  ```

- **Test Error Case (No Authentication):**
  - Headers: None
  - Expected Response:
    - Status: 401 Unauthorized
    - Body:
    ```json
    {
      "message": "No token provided! Access Denied"
    }
    ```

- **Test Error Case (Invalid Token):**
  - Headers:
  ```
  Authorization: Bearer invalid-token
  ```
  - Expected Response:
    - Status: 401 Unauthorized
    - Body:
    ```json
    {
      "message": "Invalid or expired token"
    }
    ```

### 9. Delete Book Review

- **URL:** `DELETE http://localhost:5000/customer/auth/review/1`
- **Authentication:** Bearer Token (from login)
- **Headers:**
  ```
  Authorization: Bearer <your-jwt-token>
  ```
- **Expected Response:**
  - Status: 200 OK
  - Body:
  ```json
  {
    "message": "Review deleted successfully"
  }
  ```

- **Test Error Case (No Review to Delete):**
  - URL: `DELETE http://localhost:5000/customer/auth/review/1` (after already deleting)
  - Headers:
  ```
  Authorization: Bearer <your-jwt-token>
  ```
  - Expected Response:
    - Status: 404 Not Found
    - Body:
    ```json
    {
      "message": "Review not found"
    }
    ```

## Client-Side Tests

For these tests, use the web application interface at http://localhost:5000

### 10. Client-Side Registration and Login

1. Open the application in a browser
2. Fill in the registration form and submit
3. Verify a success message appears
4. Fill in the login form with the same credentials
5. Verify login is successful and the user status shows as logged in

### 11. Client-Side Book Search

1. Select "All Books" from the dropdown and click Search
2. Verify all books are displayed
3. Select "ISBN" and enter "1" in the search field
4. Verify only the book with ISBN 1 is displayed
5. Test other search options (Author, Title)

### 12. Client-Side Review Management

1. Ensure you're logged in
2. Search for a book and click on it to view details
3. Add a review in the text area and click "Submit Review"
4. Verify the review appears in the list
5. Modify your review and submit again
6. Verify the review is updated
7. Click "Delete My Review"
8. Verify the review is removed

## Test Screenshot Requirements

For each test scenario, capture the following screenshots:

1. The Postman request configuration (URL, headers, body)
2. The Postman response (body and status code)
3. For error cases, capture the error response

Name the screenshots according to the following pattern:
- `task<number>_<success/error>_<description>.png`

Example:
- `task1_success_getAllBooks.png`
- `task7_error_invalidCredentials.png`

Place all screenshots in a `/screenshots` folder for submission.