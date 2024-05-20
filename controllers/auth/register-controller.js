const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const { User } = require("../../models/mongoosSchemas");
const { ctrlWrapper } = require("../../decorators");
const { HttpError } = require("../../helpers/HttpError");

const register = async (req, res, next) => {
  try {
    const { email, password  } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "This email is already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const avatarTypes = ['identicon', 'monsterid', 'wavatar'];
    const randomType = avatarTypes[Math.floor(Math.random() * avatarTypes.length)];

    const avatarURL = gravatar.url(email, {
      protocol: 'http',
      d: randomType,
      s: '200',
    });

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register: ctrlWrapper(register),
};
