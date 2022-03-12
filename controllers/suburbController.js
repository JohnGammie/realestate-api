var Suburb = require("../models/suburb");

exports.index = (req, res) => {
  Suburb.find({}, (err, suburbs) => {
    res.json(suburbs);
  });
};
