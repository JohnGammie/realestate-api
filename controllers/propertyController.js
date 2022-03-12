var Property = require("../models/property");

exports.index = (req, res) => {
  Property.find({})
    .populate({ path: "address", populate: { path: "suburb" } })
    .exec((err, properties) => {
      res.json(properties);
    });
};
