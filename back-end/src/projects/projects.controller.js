const projectsService = require("./projects.service")


async function create(req, res) {
  const data = await projectsService.create(req.body.data)
  res.status(201).json({data})
}

async function list(req, res, next){
  
  const data = await projectsService.list()
  res.json({data})
}

module.exports = {
  create,
  list
};
