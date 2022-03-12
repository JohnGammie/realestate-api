var Property = require("../models/property");

exports.index = (req, res) => {
  Property.find({})
    .populate({ path: "address", populate: { path: "suburb" } })
    .exec((err, properties) => {
      res.json(properties);
    });
};

exports.searchSuburb = (req, res) => {
  Property.find({})
    .populate({
      path: "address",
      populate: { path: "suburb", match: { name: req.params.suburbName } },
    })
    .exec((err, properties) => {
      // I think populate runs findById and grabs all results,
      // and then attempts to match,leaving non-matching documents with null.
      // Simply filter out of result
      res.json(
        properties.filter((property) => property.address.suburb !== null)
      );
    });
};
