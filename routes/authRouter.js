const express = require("express");
const { register, login, logout, current } = require("../controllers/auth/index");
const { isEmptyBody, authenticate } = require("../middlware/authMiddleware");
const { validateBody } = require("../decoder/validateBody");
const {
  userRegisterSchema,
  userLoginSchema,
} = require("../../models/joiSchemas/userSchema");

const userRegisterValidate = validateBody(userRegisterSchema);
const userLoginValidate = validateBody(userLoginSchema);

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, userRegisterValidate, register);
authRouter.post("/login", isEmptyBody, userLoginValidate, login);
authRouter.post("/logout", authenticate, logout);
authRouter.get("/current", authenticate, current);

module.exports = authRouter;