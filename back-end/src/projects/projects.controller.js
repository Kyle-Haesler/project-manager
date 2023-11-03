const projectsService = require("./projects.service")


async function create(req, res) {
  const data = await projectsService.create(req.body.data)
  res.status(201).json({data})
}

async function list(req, res, next){
  
  const data = await projectsService.list()
  res.json({data})
}

async function updateStatus(req, res, next){
  const {project_id} = req.params
  const data = await projectsService.updateStatus(project_id, req.body.data)
  res.json({data})
}

module.exports = {
  create,
  list,
  updateStatus
};
