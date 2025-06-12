const express = require('express');
const router = express.Router();
const multer = require('multer');
const {storage} = require("../cloudinary");
const upload = multer({storage});
const Country = require('../models/country.js');
// ---------------------------------------------- MIDDLEWARES
const {isLoggedIn, validateCountry} = require("../middleware.js");
// ---------------------------------------------- ERROR HANDLERS
const wrapAsync = require("../utils/wrapAsync.js");
// ---------------------------------------------- CONTROLLER
const countryController = require("../controllers/countries.js");

router.route("/")
    .get(wrapAsync(countryController.getCountries))
    .post(isLoggedIn, validateCountry, (req, res, next) => {
    upload.single('flag')(req, res, function (err) {
        if (err) {
            console.log("Multer Error:", err);
            req.flash("error", "File upload failed.");
            return res.redirect("/countries/new");
        }
        next();
    });
    },wrapAsync(countryController.postNewCountry));

router.route("/new")
    .get(isLoggedIn, countryController.renderNewForm);

router.route("/find")
    .get(wrapAsync(countryController.findCountry));

router.route("/:_id")
    .get(wrapAsync(countryController.showCountry))
    .put(isLoggedIn, validateCountry, upload.single('flag'), wrapAsync(countryController.updateCountry))
    .delete(isLoggedIn, wrapAsync(countryController.deleteCountry));

router.route("/:_id/edit")
    .get(isLoggedIn, wrapAsync(countryController.renderEditForm));

module.exports = router;