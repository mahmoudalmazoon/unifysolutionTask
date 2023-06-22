const todoModel = require("../models/todo.model");

const DeleteToDo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteTodo = await todoModel.findByIdAndDelete(id);
    if (!deleteTodo) {
      const err = new Error("todo Not Find");
      err.status = 404;
      throw err;
    }
  } catch (error) {
    next(error);
  }
};
const AddTodo = async (req, res, next) => {
  try {
    const newToDo = await new todoModel(req.body);
    await newToDo.save()
    return res.status(201).json({ newToDo: newToDo });
  } catch (error) {
    next(error);
  }
};
const UpdateTodo = async (req,res,next)=>{
    try {
        const updateTodo = await User.findByIdAndUpdate(req.params.id, req.body, {
            upsert: true,
            new: true,
          });
          return  res.status(202).json({ updateTodo: updateTodo });;
    } catch (error) {
        next(error);

    }
}
const getOneTodo = async (req,res,next)=>{
    try {
        const {id} = req.params
        const Todo = await todoModel.findById(id)
        return  res.status(200).json({ Todo: Todo });;
    } catch (error) {
        next(error)
    }
}
const getAllTodo = async (req,res,next)=>{
    try {
        const Todos = await todoModel.find()
        return  res.status(200).json({ Todos: Todos });;
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getAllTodo,
    getOneTodo,
    UpdateTodo,
    AddTodo,
    DeleteToDo,
  };