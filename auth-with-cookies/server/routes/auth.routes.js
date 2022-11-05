const express = require("express");
const router = express.Router();

const authenticateUser = require("../middlewares/authentication");
const {
  register,
  login,
  logout,
  alreadyExist,
} = require("../controllers/auth.controller");

router.post("/alreadyexist", alreadyExist);
router.post("/register", register);
router.post("/login", login);
router.delete("/logout", authenticateUser, logout);

module.exports = router;
