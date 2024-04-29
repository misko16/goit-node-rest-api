const { User } = require("../../models/mongoosSchemas");
const { ctrlWrapper } = require("../../decorators");
const bcrypt = require("bcryptjs");


// ДО ПОКИ НЕ ДОДАВ ОБРОБНИК ПОМИЛОК ТУТ, ВЕСЬ ЧАС БУЛА 404
const HttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};



const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw HttpError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (user) {
      // ПОФІКШЕНА
      throw HttpError(409, "This email is already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      ...req.body,
      password: hashPassword
    });

    res.status(201).json({
      // ВИПРАВЛЕНО
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register: ctrlWrapper(register),
};
