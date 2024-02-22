const { User } = require("../../models/userModel");
const  HttpError  = require('../../helpers/HttpError');
const { ctrlWrapper } = require("../../decoder/ctrlWrapper");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `${email} in use`);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};