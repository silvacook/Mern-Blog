import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, "Unauthorized: No token provided"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        console.error("Token expired:", err.message);
        return next(errorHandler(401, "Unauthorized: Token expired"));
      }
      console.error("Token verification failed:", err.message);
      return next(errorHandler(401, "Unauthorized: Invalid token"));
    }

    req.user = user; // Attach decoded user information to the request object
    next();
  });
};
