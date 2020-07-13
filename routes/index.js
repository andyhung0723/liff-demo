const express = require("express");
const router = express.Router();
const LineAuthController = require("../controllers/line_auth_controller");

lineAuthController = new LineAuthController();

router.post("/login", lineAuthController.login);

module.exports = router;
