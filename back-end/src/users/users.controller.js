const usersService = require("./users.service");

async function read(req, res, next) {
  const { user_name } = req.params;

  const data = await usersService.read(user_name);
  res.json({ data });
}

async function create(req, res, next) {
  const data = await usersService.create(req.body.data);
  res.json({ data });
}

module.exports = {
  create,
  read,
};
