/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./projects.controller");

router.route("/").post(controller.create);

module.exports = router;
