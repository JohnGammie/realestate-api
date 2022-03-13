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
});

module.exports = mongoose.model("Property", propertySchema);
