const mongoose = require("mongoose");
const Suburb = require("../models/suburb");
const async = require("async");
require("dotenv").config();

const mongoDb = process.env.MONGODB_CONNECTION_STRING;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

let suburbs = [];

const createSuburb = (name, state, postcode, cb) => {
  const suburb = new Suburb({ name: name, state: state, postcode: postcode });

  suburb.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Suburb:" + suburb);
    suburbs.push(suburb);
    cb(null, suburb);
  });
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

async.series([createSuburbs], (err, results) => {
  if (err) {
    console.log("FINAL ERR: " + err);
  }
  // All done, disconnect from database
  mongoose.connection.close();
});
