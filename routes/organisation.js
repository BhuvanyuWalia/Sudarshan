const express = require('express');
const router = express.Router();

const Organisation = require('../models/organisation.js');
const organisationController = require("../controllers/organisations.js");

router.route("/")
    .get(organisationController.getOrganisations);

router.route("/:_id")
    .get(organisationController.showOrganisation);

module.exports = router;