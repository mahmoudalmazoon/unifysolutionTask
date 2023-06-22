const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todo.controller");
const { extractJwtFromCookie } = require("../middlewares/tokenextractor.middleware");
router.post("/",extractJwtFromCookie, todoController.AddTodo);
router.delete("/",extractJwtFromCookie, todoController.DeleteToDo);
router.get("/:id",extractJwtFromCookie, todoController.getOneTodo);
router.get("/",extractJwtFromCookie,todoController.getAllTodo);
router.patch("/:id",extractJwtFromCookie,todoController.UpdateTodo);

module.exports = router;
