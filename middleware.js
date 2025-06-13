const {registerSchema, countrySchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const Country = require("./models/country.js");

module.exports.isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash("error","You must be logged in first!");
        res.redirect("/auth/login");
    }
    return next();
}

module.exports.validateRegister = (req, res, next) => {
    const { error } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const msg = error.details.map(el => el.message).join(', ');
        req.flash('error', msg);
        return res.redirect('/register');
    }
    next();
};

module.exports.validateCountry = (req, res, next) => {
  const { error } = countrySchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(', ');
    req.flash("error", `Validation Error: ${msg}`);
    return res.redirect("back"); // or res.redirect("/countries/new");
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
    const { _id } = req.params;
    const country = await Country.findById(_id);
    if (!country || !country.author) {
        req.flash('error', 'Author information missing or country not found!');
        return res.redirect(`/countries/${_id}`);
    }
    if (!country.author.equals(req.user._id)) {
        req.flash('error', 'You are not the Author of this data!');
        return res.redirect(`/countries/${_id}`);
    }
    next();
};