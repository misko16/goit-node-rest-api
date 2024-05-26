const { User } = require("../../models/mongoosSchemas");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  console.log("Verification token received:", verificationToken); 

  try {
    const user = await User.findOne({ verificationToken });
    if (!user) {
      console.log("User not found"); 
      throw HttpError(404, "User not found");
    }

    console.log("User found:", user); 
    await User.updateOne(
      { _id: user._id },
      {
        verify: true,
        verificationToken: null,
      }
    );

    console.log("User updated successfully"); 

    res.status(200).json({
      message: "Verification successful",
    });
  } catch (error) {
    console.log("Error during verification:", error); 
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = ctrlWrapper(verify);
