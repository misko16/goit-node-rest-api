const express = require("express");
const { register, login, logout, current } = require("../../controllers/auth");
const { authenticate } = require("../../middlewares");
const { validateBody } = require("../../decorators");
const {
  userRegisterSchema,
  userLoginSchema,
} = require("../../models/joiSchemas/userSchema");

const userRegisterValidate = validateBody(userRegisterSchema);
const userLoginValidate = validateBody(userLoginSchema);

const authRouter = express.Router();

authRouter.post("/register", userRegisterValidate, register);
authRouter.post("/login", userLoginValidate, login);
authRouter.post("/logout", authenticate, logout);
authRouter.get("/current", authenticate, current);

module.exports = authRouter;
