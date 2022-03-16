// Script for seeding the mongoDB with an initial set of data.
// Currently the script won't gracefully terminate but will just stop printing to the console
// the developer can then ctrl+c to end. This is mostly due to asynchronous issues I faced and didn't completely solve.

// Define several suburbs.
// Create many random addresses, build from an array of {streetNames, streetTypes, streetNumbers, suburbs}
// Foreach address create property data. {propertyType, listingType, Buy/Rent price}

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
let agents = [];

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

const createAgents = () => {
  agents.push({ name: "Shane Warne", phoneNumber: "0453045930453" });
  agents.push({ name: "Robert Plant", phoneNumber: "3465273753457" });
  agents.push({ name: "Billy Murray", phoneNumber: "1423467882457" });
  agents.push({ name: "Gary Brown", phoneNumber: "572457245682" });
};

const createSuburb = (name, state, postcode, cb) => {
  const suburb = new Suburb({ name: name, state: state, postcode: postcode });
  saveModel(suburb, "Suburb", suburbs, cb);
};

const addressStreetNames = [
  "Station",
  "John",
  "Main",
  "King",
  "Queen",
  "Elizabeth",
  "William",
  "High",
  "Victoria",
];
const addressStreetType = ["St", "Rd", "Cl", "Blvd"];
const createAddress = (cb) => {
  const address = new Address({
    streetName:
      addressStreetNames[
        Math.floor(Math.random() * addressStreetNames.length)
      ] +
      " " +
      addressStreetType[Math.floor(Math.random() * addressStreetType.length)],
    streetNumber: Math.floor(Math.random() * 300),
    suburb: suburbs[Math.floor(Math.random() * suburbs.length)],
  });
  saveModel(address, "Address", addresses, cb);
};

const createProperty = (
  address,
  propertyType,
  listingType,
  price,
  agent,
  cb
) => {
  const property = new Property({
    address: address,
    propertyType: propertyType,
    listingType: listingType,
    price: price,
    agent: agent,
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
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
      (cb) => {
        createAddress(cb);
      },
    ],
    cb
  );
};

const propertyTypes = ["House", "Apartment or Unit"];
const randomPropertyType = () => {
  return propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
};

const listingTypes = ["Buy", "Rent", "Sold"];
const randomListingType = () => {
  return listingTypes[Math.floor(Math.random() * listingTypes.length)];
};

const randomBuyPrice = () => {
  return 50000 + 50000 * Math.floor(Math.random() * 10);
};

const randomRentPrice = () => {
  return 200 + 200 * Math.floor(Math.random() * 5);
};

const randomPrice = (listingType) => {
  if (listingType === "Rent") {
    return randomRentPrice();
  }
  return randomBuyPrice();
};

const randomAgent = () => {
  return agents[Math.floor(Math.random() * agents.length)];
};

// Definitely async issues caused here by not using callback correctly.
// Data is still generated but script does not terminate gracefully. Will do for now
const createProperties = (cb) => {
  createAgents();

  addresses.forEach((element, index) => {
    async.series([
      (cb) => {
        let listingType = randomListingType();
        createProperty(
          element,
          randomPropertyType(),
          listingType,
          randomPrice(listingType),
          randomAgent(),
          cb
        );
      },
    ]);
  });
  return;
};

// Reset the DB values in this file. Definitely useful while initialy designing models
const dropCollections = async () => {
  await db.dropCollection("suburbs");
  await db.dropCollection("addresses");
  // await db.dropCollection("agents");
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
