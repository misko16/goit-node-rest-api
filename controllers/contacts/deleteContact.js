const { Contact } = require("../../models/contactModels");
const  HttpError  = require('../../helpers/HttpError');
const { ctrlWrapper } = require("../../decoder/ctrlWrapper");

const removeContactById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ _id: id, owner });

  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.json({ code: 200, message: "contact deleted" });
};

module.exports = { removeContactById: ctrlWrapper(removeContactById) };