const router = require("express").Router();

const authorizeToken = require("../middleware/auth");
const { login, dashboard } = require("../controllers/main");

router.route("/dashboard").get(authorizeToken, dashboard);
router.route("/login").post(login);

module.exports = router;
