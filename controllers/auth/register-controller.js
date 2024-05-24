const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { User } = require("../../models/mongoosSchemas");
const { ctrlWrapper } = require("../../decorators");
const { HttpError } = require("../../helpers/HttpError");
const { sendEmail } = require("../../helpers/SendEmail");
const { nanoid } = require("nanoid");

const { BASE_URL } = process.env;

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      throw HttpError(409, "This email is already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarTypes = ["identicon", "monsterid", "wavatar"];
    const verificationToken = nanoid();

    const randomType = avatarTypes[Math.floor(Math.random() * avatarTypes.length)];

    const avatarURL = gravatar.url(email, {
      protocol: "http",
      d: randomType,
      s: "200",
    });

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<p>Hello!</p>
           <p>This is a test email to verify the email sending functionality.</p>
           <p>Please click the button below to verify your email address:</p>
           <p><a href="${BASE_URL}/api/auth/verify/${verificationToken}" 
                 style="display:inline-block; padding:10px 20px; font-size:16px; color:#ffffff; background-color:#007bff; text-align:center; text-decoration:none; border-radius:5px;">
               Verify Email Address
           </a></p>
           <p>Thank you!</p>
           <p>Best regards,<br>Misko</p>`,
    };

    await sendEmail(verifyEmail);

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

module.exports = ctrlWrapper(register);
