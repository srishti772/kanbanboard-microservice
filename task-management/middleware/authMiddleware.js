const jwt = require("jsonwebtoken");
const axios = require("axios");

// Middleware to verify JWT
const authMiddleware = async (req, res, next) => {
  if (req.headers['x-internal-request']) {
    return next(); // Skip authentication for internal requests
  }

  console.log("inside auth middleware");
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return next(createError(403, "Forbidden: No token provided"));
  }

  try {
    // Decode the JWT token
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.sub) {
      return next(createError(401, "Invalid JWT token"));
    }

    // Verify token with Spring Boot microservice
    const response = await axios.get(
      `http://localhost:8080/api/users/verify/${decoded.sub}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
      }
    );

    if (response.status !== 200) {
      return next(createError(response.status, response.data));
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error.response) {
      // Microservice returned an error
      console.error(error.response);
      return next(createError(error.response.status, error.response.data));
    } else if (error.code === "ECONNREFUSED") {
      // Microservice is offline
      return next(createError(503, "Authentication service is unavailable"));
    } else {
      // Other errors
      return next(createError(401, "Invalid JWT or token verification failed"));
    }
  }
};

// Utility function to create error objects
const createError = (statusCode, message) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

module.exports = authMiddleware;
