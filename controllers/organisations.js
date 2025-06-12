const Organisation = require('../models/organisation.js');

module.exports.getOrganisations = async (req,res)=>{
    const organisations = await Organisation.find({});
    res.render("organisation/organisations.ejs",{organisations});
};

module.exports.showOrganisation = async (req,res)=>{
    let org = await Organisation.findById(req.params._id);
    res.render("organisation/show_org.ejs",{org});
};