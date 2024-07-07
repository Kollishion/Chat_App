import User from "../models/user.model.js";
import KnownContact from "../models/knownContacts.model.js";

const isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber);
};

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const loggedInUser = await User.findById(loggedInUserId).populate(
      "knownContacts"
    );

    if (!loggedInUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const knownPhoneNumbers = loggedInUser.knownContacts.map(
      (contact) => contact.phoneNumber
    );
    const users = await User.find({
      phoneNumber: { $in: knownPhoneNumbers },
    }).select("-password");

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsersForSidebar:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addContact = async (req, res) => {
  try {
    const { phoneNumber, name } = req.body;
    const loggedInUserId = req.user._id;

    if (!isValidPhoneNumber(phoneNumber)) {
      return res.status(400).json({ error: "Invalid phone number" });
    }

    const loggedInUser = await User.findById(loggedInUserId);

    if (!loggedInUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const existingContact = await KnownContact.findOne({
      userId: loggedInUserId,
      phoneNumber,
    });

    if (!existingContact) {
      const newContact = new KnownContact({
        userId: loggedInUserId,
        phoneNumber,
        name,
      });
      await newContact.save();

      loggedInUser.knownContacts.push(newContact._id);
      await loggedInUser.save();
    }

    res.status(200).json({ message: "Contact added successfully" });
  } catch (error) {
    console.error("Error in addContact:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const uploadContacts = async (req, res) => {
  try {
    const { contacts } = req.body; // Array of { phoneNumber, name }

    if (!Array.isArray(contacts) || contacts.length === 0) {
      return res.status(400).json({ error: "Invalid contacts data" });
    }

    const validContacts = contacts.filter((contact) =>
      isValidPhoneNumber(contact.phoneNumber)
    );

    if (validContacts.length === 0) {
      return res.status(400).json({ error: "No valid phone numbers provided" });
    }

    const registeredUsers = await User.find({
      phoneNumber: { $in: validContacts.map((contact) => contact.phoneNumber) },
    }).select("-password");

    const registeredPhoneNumbers = registeredUsers.map(
      (user) => user.phoneNumber
    );

    const unregisteredContacts = validContacts.filter(
      (contact) => !registeredPhoneNumbers.includes(contact.phoneNumber)
    );

    const loggedInUserId = req.user._id;
    const loggedInUser = await User.findById(loggedInUserId);

    for (const contact of validContacts) {
      const existingContact = await KnownContact.findOne({
        userId: loggedInUserId,
        phoneNumber: contact.phoneNumber,
      });

      if (!existingContact) {
        const newContact = new KnownContact({
          userId: loggedInUserId,
          phoneNumber: contact.phoneNumber,
          name: contact.name,
        });
        await newContact.save();

        loggedInUser.knownContacts.push(newContact._id);
      }
    }

    await loggedInUser.save();

    res.status(200).json({
      registeredUsers,
      unregisteredContacts,
    });
  } catch (error) {
    console.error("Error in uploadContacts:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
