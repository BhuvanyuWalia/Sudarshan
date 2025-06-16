const express = require('express');
const router = express.Router();
const Organisation = require('../models/organisation.js');
const organisationController = require("../controllers/organisations.js");
const { isLoggedIn, isOrgAuthor } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const multer = require('multer');
const {storage} = require("../cloudinary");
const upload = multer({storage});


// CREATE
router.route("/new")
    .get(isLoggedIn, organisationController.renderNewForm)
    .post(isLoggedIn,  (req, res, next) => {
    upload.single('logo')(req, res, function (err) {
        if (err) {
            console.log("Multer Error:", err);
            req.flash("error", "File upload failed.");
            return res.redirect("/countries/new");
        }
        next();
    });
    },organisationController.postNewOrganisation);

router.get('/find', wrapAsync(organisationController.findOrg));

// READ
router.route("/")
    .get(organisationController.getOrganisations);

router.route("/:_id")
    .get(organisationController.showOrganisation)
    .put(isLoggedIn, isOrgAuthor, organisationController.updateOrganisation)
    .delete(isLoggedIn, isOrgAuthor, organisationController.deleteOrganisation);

// UPDATE
router.route("/:_id/edit")
    .get(isLoggedIn, isOrgAuthor, organisationController.renderEditForm);


module.exports = router;
