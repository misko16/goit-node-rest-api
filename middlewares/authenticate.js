const { HttpError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { User } = require("../models/mongoosSchemas");
const path = require("path");
const configPath = path.join(__dirname, "..", ".env");
require("dotenv").config({ path: configPath });

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw HttpError(401, "Authorization header is required");
    }
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw HttpError(401, "Bearer token not found");
    }

    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);

    // Додав перевірку, якщо токен не збігається з тим що в базі даних
    if (!user || !user.token || user.token !== token) { 
      throw HttpError(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401));
  }
};

// Врапер прибрано
module.exports = { authenticate };
