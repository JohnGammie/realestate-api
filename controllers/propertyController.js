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

exports.fullSearch = (req, res) => {
  let listingType = req.body.searchType;
  let suburbName = req.body.suburbName;
  let propertyType = req.body.propertyType;
  let priceMin = req.body.priceMin;
  let priceMax = req.body.priceMax;

  const propertyTypeQuery = () => {
    if (propertyType !== "Any") {
      console.log("propertyType is any");
      return { propertyType: propertyType };
    } else {
      console.log("propertyType is not any");
      return null;
    }
  };

  Property.find({})
    .where({ listingType: listingType })
    .where({ price: { $lte: priceMax } })
    .where({ price: { $gte: priceMin } })
    .where(propertyTypeQuery())
    .populate({
      path: "address",
      populate: { path: "suburb", match: { name: suburbName } },
    })
    .exec((err, properties) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      }
      res.json(
        properties.filter((property) => property.address.suburb !== null)
      );
    });
};
