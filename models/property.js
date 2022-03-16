const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  propertyType: {
    type: String,
    enum: ["House", "Apartment or Unit"],
    required: true,
  },
  listingType: { type: String, enum: ["Buy", "Rent", "Sold"], required: true },
  price: { type: Number, required: true },
  agent: {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true }, // Tried to create agent as a seperate model similar to Address, however run into issues with mongoose.populate in the controller, this will have to do for now
  },
  description: {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
});

module.exports = mongoose.model("Property", propertySchema);
