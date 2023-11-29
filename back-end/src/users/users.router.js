const notFound = require("../errors/notFound");
const router = require("express").Router();
const controller = require("./users.controller");

router.route("/:user_name/:password").get(controller.login);
router.route("/:user_name").get(controller.read);
router.route("/").post(controller.create);
router.use(notFound);
module.exports = router;
