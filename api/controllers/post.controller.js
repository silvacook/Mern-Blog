import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  try {
    // Check if user is authorized (usually handled by verifyToken middleware)
    if (!req.user.isAdmin) {
      return next(errorHandler(403, "You are not allowed to create a post"));
    }

    // Validate required fields
    if (!req.body.title || !req.body.content) {
      return next(errorHandler(400, "Please provide title and content"));
    }

    // Create slug from title (for SEO friendly URLs)
    const slug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    // Create new post instance
    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user.id, // Assuming req.user.id is set by verifyToken middleware
    });

    // Save post to database
    const savedPost = await newPost.save();

    // Respond with the saved post data
    res.status(201).json(savedPost);
  } catch (error) {
    // Handle any errors and pass to error handling middleware
    next(error);
  }
};
