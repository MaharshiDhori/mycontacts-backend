const { application } = require("express");
const express = require("express");
const { register, registerUser, loginUser, currentUser } = require("../controller/userController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/current", validateToken ,currentUser)

module.exports = router;