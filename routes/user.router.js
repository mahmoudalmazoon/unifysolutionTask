const express = require("express");
const router = express.Router();

const usercontroller = require("../controllers/user.controller");
const { extractJwtFromCookie } = require("../middlewares/tokenextractor.middleware");

router.post("/",extractJwtFromCookie, usercontroller.signup);
router.get("/", extractJwtFromCookie, usercontroller.getAllUsers);
router.patch("/:id",extractJwtFromCookie, usercontroller.editUser);
router.delete("/:id",extractJwtFromCookie, usercontroller.deleteUser);
router.get("/:id",extractJwtFromCookie,usercontroller.getUserWithTodo)

module.exports = router;
