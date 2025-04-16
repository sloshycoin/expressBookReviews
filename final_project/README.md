# Book Review Application

A Node.js Express application for reviewing books with JWT authentication.

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

3. Access the web application at http://localhost:5000

## API Documentation

### Public Endpoints

#### Get All Books
- **URL:** `/`
- **Method:** `GET`
- **Description:** Returns all books in the database.
- **Sample Request:**
  ```
  GET http://localhost:5000/
  ```
- **Sample Response:**
  ```json
  {
    "1": {"author": "Chinua Achebe", "title": "Things Fall Apart", "reviews": {}},
    "2": {"author": "Hans Christian Andersen", "title": "Fairy tales", "reviews": {}}
    // More books...
  }
  ```

#### Get Book by ISBN
- **URL:** `/isbn/:isbn`
- **Method:** `GET`
- **Description:** Returns a specific book by its ISBN.
- **Sample Request:**
  ```
  GET http://localhost:5000/isbn/1
  ```
- **Sample Response:**
  ```json
  {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {}
  }
  ```

#### Get Books by Author
- **URL:** `/author/:author`
- **Method:** `GET`
- **Description:** Returns all books by a specific author.
- **Sample Request:**
  ```
  GET http://localhost:5000/author/Chinua%20Achebe
  ```
- **Sample Response:**
  ```json
  [
    {
      "author": "Chinua Achebe",
      "title": "Things Fall Apart",
      "reviews": {}
    }
  ]
  ```

#### Get Books by Title
- **URL:** `/title/:title`
- **Method:** `GET`
- **Description:** Returns all books with matching title (partial match).
- **Sample Request:**
  ```
  GET http://localhost:5000/title/Fall
  ```
- **Sample Response:**
  ```json
  [
    {
      "author": "Chinua Achebe",
      "title": "Things Fall Apart",
      "reviews": {}
    }
  ]
  ```

#### Get Book Reviews
- **URL:** `/review/:isbn`
- **Method:** `GET`
- **Description:** Returns all reviews for a specific book.
- **Sample Request:**
  ```
  GET http://localhost:5000/review/1
  ```
- **Sample Response:**
  ```json
  {
    "user1": "Great book with a powerful message.",
    "user2": "A classic that stands the test of time."
  }
  ```

#### Register a New User
- **URL:** `/register`
- **Method:** `POST`
- **Description:** Registers a new user in the system.
- **Request Body:**
  ```json
  {
    "username": "newuser",
    "password": "password123"
  }
  ```
- **Sample Response:**
  ```json
  {
    "message": "User registered successfully"
  }
  ```

### Authenticated Endpoints

#### User Login
- **URL:** `/customer/login`
- **Method:** `POST`
- **Description:** Authenticates a user and returns a JWT token.
- **Request Body:**
  ```json
  {
    "username": "newuser",
    "password": "password123"
  }
  ```
- **Sample Response:**
  ```json
  {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### Add or Update a Book Review
- **URL:** `/customer/auth/review/:isbn`
- **Method:** `PUT`
- **Description:** Adds or updates a review for a specific book.
- **Authentication:** JWT token in Authorization header
- **Request Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Request Body:**
  ```json
  {
    "review": "This is my review of the book. I found it very engaging!"
  }
  ```
- **Sample Response:**
  ```json
  {
    "message": "Review added/updated successfully",
    "book": {
      "author": "Chinua Achebe",
      "title": "Things Fall Apart",
      "reviews": {
        "newuser": "This is my review of the book. I found it very engaging!"
      }
    }
  }
  ```

#### Delete a Book Review
- **URL:** `/customer/auth/review/:isbn`
- **Method:** `DELETE`
- **Description:** Deletes a user's review for a specific book.
- **Authentication:** JWT token in Authorization header
- **Request Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Sample Response:**
  ```json
  {
    "message": "Review deleted successfully"
  }
  ```

## Testing with Postman

To test the API endpoints:

1. Start the server
2. Import the provided Postman collection (if available)
3. Test the public endpoints without authentication
4. Register a user and login to get a JWT token
5. Use the token in the Authorization header for authenticated endpoints

## Client-Side Implementation

The client-side implementation provides a user interface for interacting with the Book Review API. It includes:

- User registration and login
- Book search functionality (all books, by ISBN, author, or title)
- Viewing book details and reviews
- Adding, updating, and deleting reviews (when authenticated)

The Promise-based API calls are implemented in `/public/js/api.js` using Axios.
