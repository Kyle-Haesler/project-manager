const projectsService = require("./projects.service")


async function create(req, res) {
  const data = await projectsService.create(req.body.data)
  res.status(201).json({data})
}

module.exports = {
  create,
};
