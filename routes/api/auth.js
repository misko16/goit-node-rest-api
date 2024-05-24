const express = require("express");
const {
  register,
  login,
  logout,
  current,
  avatars,
  verify,
} = require("../../controllers/auth");
const { authenticate, upload } = require("../../middlewares");
const { validateBody } = require("../../decorators/index");
const {
  userRegisterSchema,
  userLoginSchema,
} = require("../../models/joiSchemas/userSchema");

const userRegisterValidate = validateBody(userRegisterSchema);
const userLoginValidate = validateBody(userLoginSchema);

const authRouter = express.Router();


authRouter.post(
  "/register",
  upload.single("avatarURL"),
  userRegisterValidate,
  register
);
authRouter.get("/verify/:verificationToken", verify);
authRouter.post("/login", userLoginValidate, login);
authRouter.post("/logout", authenticate, logout);
authRouter.get("/current", authenticate, current);
authRouter.patch("/avatars", upload.single("avatarURL"), authenticate, avatars);

module.exports = authRouter;
