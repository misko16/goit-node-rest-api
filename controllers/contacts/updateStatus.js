const { Contact } = require("../../models/mongoosSchemas");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../decorators");

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const contact = await Contact.findOneAndUpdate({ _id: id, owner }, req.body, {
    new: true,
  });
  if (!contact) {
    throw HttpError(404, `Not found`);
  }

  res.status(200).json(contact);
};

module.exports = { updateStatusContact: ctrlWrapper(updateStatusContact) };
