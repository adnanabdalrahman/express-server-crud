import fs from "fs";

/* =========================
   Helpers
========================= */
const DATA_FILE = "./data/users.json";

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

export const getUsers = (req, res) => {
  const users = readData();
  res.json(users);
};

export const getUser = (req, res) => {
  const users = readData();
  const id = parseInt(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

export const createUser = (req, res) => {
  const users = readData();
  const newUser = req.body;

  // Generate new id automatically
  const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

  const userWithId = { id: newId, ...newUser };

  users.push(userWithId);
  writeData(users);

  res.status(201).json({
    message: "User added successfully!",
    user: userWithId,
  });
};

export const updateUser = (req, res) => {
  const users = readData();
  const id = parseInt(req.params.id);
  const updatedData = req.body;

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  Object.assign(user, updatedData);

  writeData(users);

  res.json({
    message: "User updated successfully!",
    user,
  });
};

export const deleteUser = (req, res) => {
  const users = readData();
  const id = parseInt(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const filteredUsers = users.filter((u) => u.id !== id);
  writeData(filteredUsers);

  res.json({
    message: "User deleted successfully!",
    user: user.name,
  });
};
