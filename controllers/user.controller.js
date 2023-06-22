const userModel = require("../models/User.model");
const signup = async (req, res, next) => {
  try {
    const newUser = await new userModel(req.body);
    await newUser.save();
    return res.status(201).json({ message: "create done" });
  } catch (err) {
    return next(err);
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.find();
    return res.status(200).json({ users: users });
  } catch (error) {
    return next(error);
  }
};
// only admin or logged user can delete a user
const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  //! implementing only admin or logged user can delete their account (requires auth)

  try {
    const deletedUser = await remove(id, next);
    if (!deletedUser) {
      const err = new Error("not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({ deletedUser: deleteUser });
  } catch (err) {
    return next(new AppError(FAILURE, 404));
  }
};
const editUser = async (req, res, next) => {
  const { id } = req.params;

  //! implementing logged user can edit their details (requires auth)

  try {
    const editedUser = await User.findByIdAndUpdate(id, req.body, {
      upsert: true,
      new: true,
    });
    return res.status(202).json({ editedUser: editedUser });
  } catch (err) {
    return next(new AppError(FAILURE, 404));
  }
};
const getUserWithTodo = async (req,res,next) =>{
  try {
    const {id} = req.params
    const user = await userModel.findById(id).populate({path:"todo"})
    if(!user){
      const err = new Error("user not found")
      err.status = 404 
      throw err
    }
    return res.status(200).json({user:user})
  } catch (error) {
    return next(error)
  }
}
module.exports = { editUser, deleteUser, getAllUsers, signup,getUserWithTodo};
