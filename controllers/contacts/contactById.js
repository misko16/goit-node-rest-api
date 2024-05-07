const { Contact } = require("../../models/mongoosSchemas");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const getContactById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const contact = await Contact.findOne({ _id: id, owner });

  if (!contact) {
    throw HttpError(404, `Not found`);
  }

  res.status(200).json( contact );
};

module.exports = { getContactById: ctrlWrapper(getContactById) };
