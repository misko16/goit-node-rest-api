const { User } = require("../../models/mongoosSchemas");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const verify = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.updateOne(
    { _id: user._id },
    {
      verify: true,
      verificationToken: null,
    }
  );

  res.status(200).json({
    message: "Verification successful",
  });
};

module.exports = ctrlWrapper(verify);
