const { ctrlWrapper } = require("../../decorators");
const { User } = require("../../models/mongoosSchemas");
const { HttpError } = require("../../helpers");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");

const avatars = async (req, res) => {
  const { file, user } = req;

  if (!file) {
    throw HttpError(400, "File missing");
  }
  
  const avatarName = `${user._id}_${Date.now()}_${file.originalname}`;
  const avatarPath = path.join(__dirname, "../../public/avatars", avatarName);

  const image = await Jimp.read(file.path);
  image.resize(250, 250);


  await image.writeAsync(avatarPath);
  await fs.unlink(file.path); 

  const avatarURL = `/avatars/${avatarName}`;

  await User.findByIdAndUpdate(user._id, { avatarURL });

  res.status(200).json({
    avatarURL,
  });
};

module.exports = { avatars: ctrlWrapper(avatars) };
