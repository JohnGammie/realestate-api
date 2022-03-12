const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  streetName: { type: String, required: true },
  streetNumber: { type: String, required: true },
  suburb: { type: mongoose.Schema.Types.ObjectId, ref: "Suburb" },
});

module.exports = mongoose.model("Address", addressSchema);
