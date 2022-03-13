const mongoose = require("mongoose");
const async = require("async");
require("dotenv").config();

const Suburb = require("../models/suburb");
const Address = require("../models/address");
const Property = require("../models/property");

const mongoDb = process.env.MONGODB_CONNECTION_STRING;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

let suburbs = [];
let addresses = [];
let properties = [];

const saveModel = (model, modelName, saveCollection, cb) => {
  model.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`New ${modelName}:` + model);
    saveCollection.push(model);
    cb(null, model);
  });
};

const createSuburb = (name, state, postcode, cb) => {
  const suburb = new Suburb({ name: name, state: state, postcode: postcode });
  saveModel(suburb, "Suburb", suburbs, cb);
};

const createAddress = (streetName, streetNumber, suburb, cb) => {
  const address = new Address({
    streetName: streetName,
    streetNumber: streetNumber,
    suburb: suburb,
  });
  saveModel(address, "Address", addresses, cb);
};

const createProperty = (address, propertyType, listingType, price, cb) => {
  const property = new Property({
    address: address,
    propertyType: propertyType,
    listingType: listingType,
    price: price,
  });
  saveModel(property, "Property", properties, cb);
};

const createSuburbs = (cb) => {
  async.series(
    [
      (cb) => {
        createSuburb("Box Hill", "VIC", 3128, cb);
      },
      (cb) => {
        createSuburb("South Yarra", "VIC", 3141, cb);
      },
      (cb) => {
        createSuburb("Carlton", "VIC", 3053, cb);
      },
      (cb) => {
        createSuburb("Fitzroy", "VIC", 3065, cb);
      },
    ],
    cb
  );
};

const createAddresses = (cb) => {
  async.series(
    [
      (cb) => {
        createAddress("Station St", "12", suburbs[0], cb);
      },
      (cb) => {
        createAddress("John St", "24", suburbs[0], cb);
      },
      (cb) => {
        createAddress("Bill Road", "32", suburbs[1], cb);
      },
    ],
    cb
  );
};

const createProperties = (cb) => {
  async.series(
    [
      (cb) => {
        createProperty(addresses[0], "House", "Buy", 300000, cb);
      },
      (cb) => {
        createProperty(addresses[1], "House", "Buy", 500000, cb);
      },
      (cb) => {
        createProperty(addresses[2], "Apartment or Unit", "Rent", 500, cb);
      },
    ],
    cb
  );
};

// Reset the DB values in this file. Definitely useful while initialy designing models
const dropCollections = async () => {
  await db.dropCollection("suburbs");
  await db.dropCollection("addresses");
  await db.dropCollection("properties");
};

dropCollections();
async.series(
  [createSuburbs, createAddresses, createProperties],
  (err, results) => {
    if (err) {
      console.log("FINAL ERR: " + err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
