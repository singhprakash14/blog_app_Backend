const Blog = require("../models/blog.model");

async function createBlog(title, content, authorId) {
  try {
    return await Blog.create({
      title,
      content,
      author: authorId,
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllBlogs() {
  try {
    return await Blog.find().populate("author", "username");
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getBlogById(id) {
  try {
    const blog = await Blog.findById(id).populate("author", "username");
    if (!blog) throw new Error("Blog not found");
    return blog;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateBlog(id, title, content) {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        content,
      },
      { new: true }
    );
    if (!updatedBlog) throw new Error("Blog not found");
    return updatedBlog;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteBlog(id) {
  try {
    const deletedBlog = await Blog.findByIdAndRemove(id);
    if (!deletedBlog) throw new Error("Blog not found");
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
