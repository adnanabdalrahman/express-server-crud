import prisma from "../config/prisma.js";

// GET all posts
export const getPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    orderBy: { id: "asc" },
  });
  res.json(posts);
};

// GET single post
export const getPost = async (req, res) => {
  const id = parseInt(req.params.id);
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.json(post);
};

// CREATE post
export const createPost = async (req, res) => {
  const { url, title, short_content, content } = req.body;
  const post = await prisma.post.create({
    data: {
      url,
      title,
      short_content,
      content,
    },
  });

  res.status(201).json({
    message: "Post added successfully!",
    post: post,
  });
};

// UPDATE post
export const updatePost = async (req, res) => {
  const id = parseInt(req.params.id);
  const { url, title, short_content, content } = req.body;

  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        url,
        title,
        short_content,
        content,
      },
    });

    res.json({
      message: "Post updated successfully!",
      post: post,
    });
  } catch (error) {
    res.status(404).json({ message: "Post not found" });
  }
};

// DELETE post
export const deletePost = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const post = await prisma.post.delete({
      where: { id },
    });
    res.json({
      message: "Post deleted successfully!",
      post: post,
    });
  } catch (error) {
    res.status(404).json({ message: "Post not found" });
  }
};
