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
      if (err) {
        res.sendStatus(404);
      } else {
        let filteredProperties = properties.filter(
          (property) => property.address.suburb !== null
        );

        if (filteredProperties.length > 0) {
          res.json(filteredProperties);
        } else {
          res.sendStatus(404);
        }
      }
    });
};

exports.property = (req, res) => {
  Property.findById(req.params.id)
    .populate({
      path: "address",
      populate: { path: "suburb" },
    })
    .exec((err, property) => {
      console.log(property);
      if (err || !property) {
        res.sendStatus(404);
      } else {
        res.json(property);
      }
    });
};

exports.fullSearch = (req, res) => {
  let listingType = req.query.searchType;
  let suburbName = req.query.suburbName;
  let propertyType = req.query.propertyType;
  let priceMin = req.query.priceMin;
  let priceMax = req.query.priceMax;
  let sort = req.query.sort;

  const priceMinQuery = () => {
    if (priceMin !== "0") {
      return { price: { $gte: priceMin } };
    }
    return null;
  };

  const priceMaxQuery = () => {
    if (priceMax !== "0") {
      return { price: { $lte: priceMax } };
    }
    return null;
  };

  const propertyTypeQuery = () => {
    if (propertyType !== "Any") {
      return { propertyType: propertyType };
    } else {
      return null;
    }
  };

  const sortQuery = () => {
    if (sort === "ascending") {
      return { price: "ascending" };
    } else if (sort === "descending") {
      return { price: "descending" };
    }
    return {};
  };

  Property.find({})
    .where({ listingType: listingType })
    .where(priceMaxQuery())
    .where(priceMinQuery())
    .where(propertyTypeQuery())
    .sort(sortQuery())
    .populate({
      path: "address",
      populate: { path: "suburb", match: { name: suburbName } },
    })
    .exec((err, properties) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      }
      let filteredProperties = properties.filter(
        (property) => property.address.suburb !== null
      );
      if (filteredProperties.length > 0) {
        res.json(filteredProperties);
      } else {
        res.sendStatus(404);
      }
    });
};
