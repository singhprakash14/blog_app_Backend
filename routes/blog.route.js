const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog.controller");
const authMiddleware = require("../middlwares/auth");

// Create a new blog
router.post("/blog", authMiddleware.authenticateToken, blogController.createBlog);

// Fetch all blogs
router.get("/blog", blogController.getAllBlogs);

// Fetch a single blog by ID
router.get("/blog/:id", blogController.getBlogById);

// Update a blog
router.put("/blog/:id", authMiddleware.authenticateToken, blogController.updateBlog);

// Delete a blog
router.delete(
  "/blog/:id",
  authMiddleware.authenticateToken,
  blogController.deleteBlog
);

module.exports = router;
