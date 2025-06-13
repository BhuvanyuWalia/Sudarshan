const Organisation = require('../models/organisation.js');

module.exports.getOrganisations = async (req, res) => {
    const organisations = await Organisation.find({});
    res.render("organisation/organisations.ejs", { organisations, query: {} });
};

module.exports.showOrganisation = async (req, res) => {
    const org = await Organisation.findById(req.params._id).populate('author');
    res.render("organisation/show_org.ejs", { org });
};

module.exports.renderNewForm = (req, res) => {
    res.render("organisation/new_org.ejs");
};

module.exports.postNewOrganisation = async (req, res) => {
    const org = new Organisation(req.body.organisation);
    org.author = req.user._id;
    await org.save();
    req.flash("success", "Organisation added successfully!");
    res.redirect("/organisations");
};

module.exports.renderEditForm = async (req, res) => {
    const org = await Organisation.findById(req.params._id);
    res.render("organisation/edit_org.ejs", { org });
};

module.exports.updateOrganisation = async (req, res) => {
    const { _id } = req.params;
    await Organisation.findByIdAndUpdate(_id, req.body.organisation);
    req.flash("success", "Organisation updated successfully!");
    res.redirect(`/organisations/${_id}`);
};

module.exports.deleteOrganisation = async (req, res) => {
    const { _id } = req.params;
    await Organisation.findByIdAndDelete(_id);
    req.flash("success", "Organisation deleted!");
    res.redirect("/organisations");
};

module.exports.findOrg = async (req, res) => {
  const { name, headquarters, keywords, formedAfter, formedBefore } = req.query;
  const query = {};

  if (name) query.name = { $regex: new RegExp(name, 'i') };
  if (headquarters) query.headquarters = { $regex: new RegExp(headquarters, 'i') };

  if (keywords) {
    const keywordRegex = new RegExp(keywords, 'i');
    query.$or = [
      { name: keywordRegex },
      { headquarters: keywordRegex },
      { website: keywordRegex },
      { purpose: keywordRegex }
    ];
  }

  if (formedAfter || formedBefore) {
    query.formation_date = {};
    if (formedAfter) query.formation_date.$gte = new Date(formedAfter);
    if (formedBefore) query.formation_date.$lte = new Date(formedBefore);
  }

  const organisations = await Organisation.find(query);
  res.render('organisation/organisations.ejs', { organisations, query });
};