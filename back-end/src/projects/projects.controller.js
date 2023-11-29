const projectsService = require("./projects.service");

// Validation - all specific validations will be preceeded by a 'v' and a short description
// vProject_Id exists - ensures project id does exist
async function projectIdExists(req, res, next) {
  const { project_id } = req.params;
  const data = await projectsService.read(project_id);
  if (!data) {
    return next({
      message: `Project Id: ${project_id} does not exist.`,
      status: 400,
    });
  }
  res.locals.projectInfo = data;
  next();
}
//vCreate_Project - general validation to make sure required fields are present and not blank
function createProjectFieldsPresent(req, res, next) {
  const { data } = req.body;
  if (
    !data ||
    Object.keys(data).length === 0 ||
    Object.keys(data).length !== 6
  ) {
    return next({
      message:
        "Data object empty or does not include required fields of project_name, user_name, client, status, notes and tag",
      status: 400,
    });
  }
  const { project_name, client, status, user_name, notes, tag } = data;
  if (!project_name) {
    return next({
      message: "Project_name field is missing or blank.",
      status: 400,
    });
  }
  if (!client) {
    return next({
      message: "client field is missing or blank.",
      status: 400,
    });
  }
  if (!status) {
    return next({
      message: "status field is missing or blank.",
      status: 400,
    });
  }
  if (!notes) {
    return next({
      message: "notes field is missing or blank",
      status: 400,
    });
  }
  if (!tag) {
    return next({
      message: "tag field is missing or blank.",
      status: 400,
    });
  }
  if (!user_name) {
    return next({
      message: "tag field is missing or blank.",
      status: 400,
    });
  }

  next();
}
// vCreate_Project - user_name validation, make sure the user_name actually exists
async function userNameExists(req, res, next) {
  const { user_name } = req.body.data;
  const data = await projectsService.readUser(user_name);
  if (!data) {
    return next({
      message: `${user_name} is not valid.`,
      status: 400,
    });
  }
  next();
}
// vCreate_Project - status validation, make sure status is one of the acceptable values
const availableStatuses = [
  "Discovery",
  "Waiting",
  "In-Progress",
  "Sent",
  "Complete",
  "Archive",
];
function statusPropertyValid(req, res, next) {
  const { status } = req.body.data;
  if (!availableStatuses.includes(status)) {
    return next({
      message: `${status} is not a valid status.`,
      status: 400,
    });
  }
  return next();
}
// vCreate_Project - tag validation, make sure the tag is one of the acceptable values
const availableColors = [
  "Red",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Indigo",
  "Violet",
];
function tagPropertyValid(req, res, next) {
  const { tag } = req.body.data;
  if (!availableColors.includes(tag)) {
    return next({
      message: `${tag} is not a valid tag.`,
      status: 400,
    });
  }
  next();
}

async function create(req, res) {
  const data = await projectsService.create(req.body.data);
  res.status(201).json({ data });
}

async function list(req, res, next) {
  const data = await projectsService.list();
  res.json({ data });
}
async function read(req, res, next) {
  const data = res.locals.projectInfo;
  res.json({ data });
}

async function updateStatus(req, res, next) {
  const { project_id } = req.params;
  const data = await projectsService.updateStatus(project_id, req.body.data);
  res.json({ data });
}
async function update(req, res, next) {
  const { project_id } = req.params;
  const data = await projectsService.update(project_id, req.body.data);
  res.json({ data });
}
async function destroy(req, res, next) {
  const { project_id } = req.params;
  await projectsService.delete(project_id);
  res.sendStatus(204);
}
async function search(req, res, next) {
  const { searchData } = req.params;
  const data = await projectsService.search(searchData);
  res.json({ data });
}

module.exports = {
  create: [
    createProjectFieldsPresent,
    userNameExists,
    statusPropertyValid,
    tagPropertyValid,
    create,
  ],
  list,
  read: [projectIdExists, read],
  updateStatus,
  update,
  delete: destroy,
  search,
};
