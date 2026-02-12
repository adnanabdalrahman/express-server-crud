import fs from "fs";

/* =========================
   Helpers
========================= */

const DATA_FILE = "./data/posts.json";

// Read JSON File
function readData() {
  const data = fs.readFileSync(DATA_FILE, "utf8");
  return JSON.parse(data || "[]");
}

// Write JSON File
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

/* =========================
   Controllers
========================= */

// GET all posts
export const getPosts = (req, res) => {
  const posts = readData();
  res.json(posts);
};

// GET single post
export const getPost = (req, res) => {
  const posts = readData();
  const id = parseInt(req.params.id);

  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json(post);
};

// CREATE post
export const createPost = (req, res) => {
  const posts = readData();
  const newPost = req.body;

  const newId = posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1;

  const postWithId = { id: newId, ...newPost };

  posts.push(postWithId);
  writeData(posts);

  res.status(201).json({
    message: "Post added successfully!",
    post: postWithId,
  });
};

// UPDATE post
export const updatePost = (req, res) => {
  const posts = readData();
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  Object.assign(post, updatedData);

  writeData(posts);

  res.json({
    message: "Post updated successfully!",
    post,
  });
};

// DELETE post
export const deletePost = (req, res) => {
  const posts = readData();
  const id = parseInt(req.params.id);

  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const filteredPosts = posts.filter((p) => p.id !== id);
  writeData(filteredPosts);

  res.json({
    message: "Post deleted successfully!",
    post: post.title,
  });
};
