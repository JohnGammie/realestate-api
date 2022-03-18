const express = require("express");
const router = express.Router();

const Address = require("../models/address");
const propertyController = require("../controllers/propertyController");
const suburbControler = require("../controllers/suburbController");

/**
 * @swagger
 * /search:
 *  get:
 *    summary: List of all properties that match search query
 *    description: List of all properties that match search query
 *    parameters:
 *     - in: query
 *       name: searchType
 *       required: true
 *       description: The type of property state to search for
 *       schema:
 *        type: string
 *        enum: [Buy, Rent, Sold]
 *     - in: query
 *       name: suburbName
 *       required: true
 *       description: the name of the suburb
 *       schema:
 *        type: string
 *        enum: [Box Hill, South Yarra, Carlton, Fitzroy]
 *     - in: query
 *       name: propertyType
 *       required: true
 *       description: The type of property
 *       schema:
 *        type: string
 *        enum: [Any, House, Apartment or Unit]
 *     - in: query
 *       name: priceMin
 *       required: true
 *       description: Minimum price to use in search
 *       schema:
 *        type: number
 *       default: 0
 *     - in: query
 *       name: priceMax
 *       required: true
 *       description: Maximum price to use in search
 *       schema:
 *        type: number
 *       default: 0
 *    responses:
 *      200:
 *        description: List of all properties that match search query
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
router.get("/", propertyController.fullSearch);

/**
 * @swagger
 * /search/suburbs:
 *  get:
 *    summary: List of all suburbs
 *    description: List of all suburbs
 *    responses:
 *      200:
 *        description: A list of suburbs
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
router.get("/suburbs", suburbControler.index);

/**
 * @swagger
 * /search/addresses:
 *  get:
 *    summary: List of all addresses
 *    description: List of all addresses
 *    responses:
 *      200:
 *        description: A list of addresses
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
router.get("/addresses", (req, res, next) => {
  Address.find({})
    .populate("suburb")
    .exec((err, addresses) => {
      res.json(addresses);
    });
});

/**
 * @swagger
 * /search/properties:
 *  get:
 *    summary: List of all properties
 *    description: List of all properties
 *    responses:
 *      200:
 *        description: A list of properties
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
router.get("/properties", propertyController.index);

/**
 * @swagger
 * /search/properties/suburb/{suburbName}:
 *  get:
 *    summary: List of all properties in the selected suburb
 *    description: List of all properties in the selected suburb
 *    parameters:
 *     - in: path
 *       name: suburbName
 *       required: true
 *       description: the name of the suburb
 *       schema:
 *        type: string
 *    responses:
 *      200:
 *        description: List of all properties in the selected suburb
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
router.get("/properties/suburb/:suburbName", propertyController.searchSuburb);

/**
 * @swagger
 * /search/property/{id}:
 *  get:
 *    summary: Details of a property selected by ID
 *    description: Details of a property selected by ID
 *    parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: the id of a specific property
 *       schema:
 *        type: string
 *    responses:
 *      200:
 *        description: Details of a property selected by ID
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
router.get("/property/:id", propertyController.property);

module.exports = router;
