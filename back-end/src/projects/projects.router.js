const notFound = require("../errors/notFound");
const router = require("express").Router();
const controller = require("./projects.controller");

router.route("/search/:searchData").get(controller.search);
router.route("/:project_id/edit").put(controller.update);
router
  .route("/:project_id")
  .get(controller.read)
  .put(controller.updateStatus)
  .delete(controller.delete);
router.route("/").get(controller.list).post(controller.create);
router.use(notFound);
module.exports = router;
