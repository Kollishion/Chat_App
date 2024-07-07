import mongoose from "mongoose";

const knownContactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: "",
  },
});

const knownContacts = mongoose.model("knownContacts", knownContactSchema);

export default knownContacts;
