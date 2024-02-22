const { User } = require("../../models/userModel");
const { ctrlWrapper } = require("../../decoder/ctrlWrapper");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndDelete(req.user._id, { token: "" });

  res.status(204);
};

module.exports = {
  logout: ctrlWrapper(logout),
};