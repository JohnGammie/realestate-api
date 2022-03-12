const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const suburbSchema = new Schema({
  name: { type: String, required: true },
  state: {
    type: String,
    enum: ["VIC", "NSW", "QLD", "SA", "TAS", "WA", "NT"],
    required: true,
  },
  postcode: { type: Number, required: true },
});

module.exports = mongoose.model("Suburb", suburbSchema);
