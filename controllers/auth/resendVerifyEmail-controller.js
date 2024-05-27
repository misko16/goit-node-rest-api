const { HttpError } = require("../../helpers");
const { User } = require("../../models/mongoosSchemas");
const { sendEmail } = require("../../helpers/SendEmail");
const { ctrlWrapper } = require("../../decorators");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => { 
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(400, "Email not found");
  }
  
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<p>Hello!</p>
           <p>This is a test email to verify the email sending functionality.</p>
           <p>Please click the button below to verify your email address:</p>
           <p><a href="${BASE_URL}/api/users/verify/${user.verificationToken}" 
                 style="display:inline-block; padding:10px 20px; font-size:16px; color:#ffffff; background-color:#007bff; text-align:center; text-decoration:none; border-radius:5px;">
               Verify Email Address
           </a></p>
           <p>Thank you!</p>
           <p>Best regards,<br>Misko</p>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({ message: "Verification email sent" }); 
}

module.exports = ctrlWrapper(resendVerifyEmail);
