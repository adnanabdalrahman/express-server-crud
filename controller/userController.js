// CRUD
// GET get all users X
// GET get user   => url/id    X
// POST create user  => body X
// PUT Update user  => url/id  + body X
// DELETE delete user => url/id
// GET get all users

export const getUsers = (req, res) => {
  res.json(users);
};

export const getUser = (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find((user) => user.id === id);
  if (!user) {
    res.json({ massage: "User not found" });
  }
  res.json(user);
};

export const createUser = (req, res) => {
  const user = req.body;
  users.push(user);
  res.json({ massage: "User added succesfully !", user: user });
};

export const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const newUser = req.body;
  const user = users.find((user) => user.id === id);
  if (!user) {
    res.json({ massage: "User not found" });
  }
  const name = newUser.name;
  const age = newUser.age;
  if (name) user.name = name;
  if (age) user.age = age;

  //   Object.assign(user, newUser);
  res.json({ massage: "User updated succesfully !", user: newUser });
};

export const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find((user) => user.id === id);
  if (!user) {
    res.json({ massage: "User not found" });
  }

  users = users.filter((u) => u.id !== id);

  res.json({ massage: "User deleted succesfully !", user: user.name });
};

let users = [
  {
    id: 1,
    name: "Ahmad",
    age: 22,
  },
  {
    id: 2,
    name: "Mohamad",
    age: 29,
  },
];
