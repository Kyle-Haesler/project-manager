/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./projects.controller");

router.route("/:project_id/edit").put(controller.update)
router.route("/:project_id").get(controller.read).put(controller.updateStatus)
router.route("/").get(controller.list).post(controller.create);

module.exports = router;
