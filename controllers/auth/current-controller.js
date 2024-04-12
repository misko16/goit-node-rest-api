const { ctrlWrapper } = require("../../decorators");

const current = async (req, res) => {
  try {
    if (!req.user) {
      console.log("User not found in request");
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const { email, subscription } = req.user; 
    console.log("Current user data:", { email, subscription });
    res.status(200).json({
      email,
      subscription,
    });
  } catch (error) {
    console.log("Error in current controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  current: ctrlWrapper(current),
};
