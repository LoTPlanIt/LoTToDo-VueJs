const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const projectBoardRoute = require("./projectBoardRoute");
const loginRoutes = require("./login");
const registerRoutes = require("./register");

router.use("/login", loginRoutes);
router.use("/register", registerRoutes);
router.use("/project_board", verifyToken, projectBoardRoute);

module.exports = router;
