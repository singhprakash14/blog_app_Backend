const blogService = require("../services/blog.service");

const Joi = require("joi");



const createBlogSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

exports.createBlog = async (req, res) => {
  try {
  
    const { error } = createBlogSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

   
    const { title, content } = req.body;
    const newBlog = await blogService.createBlog(title, content, req.user.userId);
    res.json(newBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await blogService.getBlogById(req.params.id);
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedBlog = await blogService.updateBlog(
      req.params.id,
      title,
      content
    );
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await blogService.deleteBlog(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
