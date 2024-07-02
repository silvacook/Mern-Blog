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

export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { category: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
      
      const totalPosts = await Post.countDocuments();

      const now = new Date();

      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      );

      const lastMonthsPosts = await Post.countDocuments({
        createdAt: {$gte: oneMonthAgo},
      });

      res.status(200).json([
        posts, 
        totalPosts,
        lastMonthsPosts,
      ]);
  } catch (error) {
    next(error);
  }
};
