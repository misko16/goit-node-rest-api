const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");
const jwt = require("jsonwebtoken");
const { User } = require("../models/mongoosSchemas");
const path = require("path");
const configPath = path.join(__dirname, "..", ".env");
require("dotenv").config({ path: configPath });

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      // console.log('No Authorization header or Bearer token found')
      throw  new HttpError(401, 'No Authorization header or Bearer token found');
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      // console.log('No token found after Bearer')
      throw  new HttpError(401, 'No token found after Bearer');
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.token !== token) {
      // console.log('Not authorized')
      throw new HttpError(401,'Not authorized');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticate: ctrlWrapper(authenticate) };
