var express = require("express");
var router = express.Router();

var Suburb = require("../models/suburb");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ endpoint: "search" });
});

router.get("/suburbs", (req, res, next) => {
  Suburb.find({}, (err, suburbs) => {
    res.json(suburbs);
  });
});

module.exports = router;
