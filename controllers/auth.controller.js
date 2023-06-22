const authService = require("../services/auth.service");
const signin = async (req, res, next) => {
  try {
    const data = await authService.signin(req.body);
    const accessToken = await authService.generateAccessToken(data);
    return res
      .cookie("auth", accessToken, {
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ user: data });
  } catch (error) {
    next(err);
  }
};
module.exports = {
  signin
}