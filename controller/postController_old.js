import pool from "../config/db.js";

// GET all posts
export const getPosts = async (req, res) => {
  const result = await pool.query("SELECT * FROM posts ORDER BY id");
  res.json(result.rows);
};

// GET single post
export const getPost = async (req, res) => {
  const id = parseInt(req.params.id);

  const result = await pool.query("SELECT * FROM posts where id = $1 ", [id]);

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.json(result.rows[0]);
};

// CREATE post
export const createPost = async (req, res) => {
  const { url, title, short_content, content } = req.body;

  const result = await pool.query(
    `INSERT INTO posts (url, title, short_content, content)
   VALUES ($1,$2,$3,$4)
   RETURNING *`,
    [url, title, short_content, content],
  );

  res.status(201).json({
    message: "Post added successfully!",
    post: result.rows[0],
  });
};

// UPDATE post
export const updatePost = async (req, res) => {
  const id = parseInt(req.params.id);
  const { url, title, short_content, content } = req.body;

  const result = await pool.query(
    `UPDATE posts
    SET 
    url = COALESCE($1,url),
    title = COALESCE($2,title),
    short_content = COALESCE($3,short_content),
    content = COALESCE($4,content)
    where id = $5
    RETURNING *`,
    [url, title, short_content, content, id],
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json({
    message: "Post updated successfully!",
    post: result.rows[0],
  });
};

/**
DROP TABLE posts حذف  جدول 
TRUNCATE TABLE posts  حذف الداتا كاملة من الجدلة 
DELETE FROM  posts where id = 3   حذف عنصر حسب الاي دي او بدون اي دي حذف الجميع
*/

// DELETE post
export const deletePost = async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await pool.query(
    "DELETE FROM posts where id = $1 RETURNING *",
    [id],
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json({
    message: "Post deleted successfully!",
    post: result.rows[0],
  });
};
