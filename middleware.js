const {registerSchema, countrySchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

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