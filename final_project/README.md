# Final Project

Final project for IBM Backend Development with NodeJS and Express

## Tasks

1. Complete the code for getting the list of books available in the shop under `public_users.get('/',function (req, res) {`.

   - Run npm install for installing the required modules & start the server.
   - Test the output on Postman.
   - Please take a screenshot of the same and save it with the name 1-getallbooks.png for submitting under 1.for the Peer Review Assignment.

   **Hint** Use the JSON.stringify method for displaying the output neatly.

2. Complete the code for getting the book details based on ISBN under `public_users.get('/isbn/:isbn',function (req, res) {`.

   - Test the output on Postman.
   - Please take a screenshot of the same and save it with the name 2-gedetailsISBN.png for submitting under 2.for the Peer Review Assignment.

   **Hint** Retrieve the ISBN from the request parameters

3. Complete the code for getting the book details based on the author under `public_users.get('/author/:author',function (req, res) {`.

   - Test the output on Postman.
   - Please take a screenshot of the same and save it with the name 3-getbooksbyauthor.png for submitting under 3.for the Peer Review Assignment.

   **Hint** - Obtain all the keys for the ‘books’ object. - Iterate through the ‘books’ array & check the author matches the one provided in the request parameters.

4. Complete the code for getting the book details based on the title under `public_users.get('/title/:title',function (req, res) {`.

   - Test the output on Postman.
   - Please take a screenshot of the same and save it with the name 4-getbooksbytitle.png for submitting under 4.for the Peer Review Assignment.

   **Hint** This will be similar to Exercise 3

5. Complete the code for getting book reviews under `public_users.get('/review/:isbn',function (req, res) {`.

   - Please take a screenshot of the same and save it with the name 5-getbookreview.png for submitting under 5.for the Peer Review Assignment.

   **Hint** Get the book reviews based on ISBN provided in the request parameters.

6. Complete the code for registering a new user

   - Test the output on Postman.
   - Please take a screenshot of the same and save it with the name 6-register.png for submitting under 6.for the Peer Review Assignment.

   **Hint** The code should take the ‘username’ and ‘password’ provided in the body of the request for registration. If the username already exists, it must mention the same & must also show other errors like eg. when username &/ password are not provided.
