const express = require('express');
const router = express.Router();
const Organisation = require('../models/organisation.js');
const organisationController = require("../controllers/organisations.js");
const { isLoggedIn, isOrgAuthor } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");


// CREATE
router.route("/new")
    .get(isLoggedIn, organisationController.renderNewForm)
    .post(isLoggedIn, organisationController.postNewOrganisation);

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
