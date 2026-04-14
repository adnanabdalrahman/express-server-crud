import prisma from "../config/prisma.js";
import fs from "fs";
import path from "path";

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
  const { title, short_content, content } = req.body;

  const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : null;

  const post = await prisma.post.create({
    data: {
      title,
      short_content,
      content,
      url: imageUrl,
    },
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
};

export const updatePost = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, short_content, content } = req.body;

  try {
    // get current post
    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    let imageUrl = existingPost.url;

    // if new image uploaded
    if (req.file) {
      imageUrl = `/uploads/images/${req.file.filename}`;

      // delete old image
      if (existingPost.url) {
        const oldImagePath = path.join(process.cwd(), existingPost.url);

        fs.unlink(oldImagePath, (err) => {
          if (err) console.log("Old image not deleted:", err);
        });
      }
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        short_content,
        content,
        url: imageUrl,
      },
    });

    res.json({
      message: "Post updated successfully!",
      post,
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

    if (post.url) {
      const imagePath = path.join(process.cwd(), post.url);

      fs.unlink(imagePath, (err) => {
        if (err) console.log("Image not deleted:", err);
      });
    }

    res.json({
      message: "Post deleted successfully!",
      post,
    });
  } catch (error) {
    res.status(404).json({ message: "Post not found" });
  }
};
