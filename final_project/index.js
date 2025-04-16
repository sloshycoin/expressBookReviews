const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
  // Check if authorization header exists
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ message: "No token provided! Access Denied" });
  }
  
  // Verify the token
  try {
    // Remove "Bearer " from token if present
    const tokenString = token.includes("Bearer ") ? token.split(" ")[1] : token;
    const decoded = jwt.verify(tokenString, "fingerprint_customer");
    req.user = decoded; // Add user info to request
    next(); // Proceed to the protected route
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log(`Server is running on ${PORT}`));
