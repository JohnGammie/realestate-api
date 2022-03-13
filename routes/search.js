const express = require("express");
const router = express.Router();

const Address = require("../models/address");
const propertyController = require("../controllers/propertyController");
const suburbControler = require("../controllers/suburbController");

/* GET home page. */
router.get("/", propertyController.fullSearch);

router.get("/suburbs", suburbControler.index);

router.get("/addresses", (req, res, next) => {
  Address.find({})
    .populate("suburb")
    .exec((err, addresses) => {
      res.json(addresses);
    });
});

router.get("/properties", propertyController.index);

router.get("/properties/suburb/:suburbName", propertyController.searchSuburb);

module.exports = router;
