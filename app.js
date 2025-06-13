if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
// ---------------------------------------------- express and mongoose
const express = require('express');
const app = express();
const mongoose = require('mongoose');
// ---------------------------------------------- EJS and path
const path = require('path');
const engine = require('ejs-mate');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// ---------------------------------------------- Method Override
const methodOverride = require('method-override');
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
// ---------------------------------------------- Routers
const countries = require('./routes/country.js');
const organisations = require('./routes/organisation.js');
const authRoutes = require("./routes/auth.js");
// ---------------------------------------------- Static Files
app.use('/flags', express.static(path.join(__dirname, 'flags')));
app.use('/logos', express.static(path.join(__dirname, 'logos')));
app.use(express.static(path.join(__dirname, 'public')));
// ---------------------------------------------- Models
const Country = require("./models/country.js");
const Organisation = require("./models/organisation.js");
// ---------------------------------------------- Session and Flash
const session = require('express-session');
const flash = require('connect-flash');
app.use(flash());
// ---------------------------------------------- Passport
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');
// ---------------------------------------------- ExpressError
const ExpressError = require('./utils/ExpressError.js');

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.active = "";
    next();
});

// ---------------------------------------------- CONNECTING TO MONGO DB
main().then(()=>{
    console.log("connected to DB - Sudarshan");
}).catch((err)=>{
    console.log("error connecting to DB");
});

async function main(){
    await mongoose.connect(process.env.MONGO_URL);
}



// -------------------------- BASE ROUTES
app.get("/",(req,res)=>{
    res.redirect("/home");
});

app.get("/home", async (req, res) => {
    const totalCountries = await Country.countDocuments();
    const totalOrganisations = await Organisation.countDocuments();
    const uniqueRegions = await Country.distinct("region");
    res.render("home.ejs", {
        totalCountries,
        totalOrganisations,
        totalRegions: uniqueRegions.length,
        user: req.user
    });
});

// USING ROUTE FOR /COUNTRIES ------------------------
app.use("/countries", countries);
// USING ROUTE FOR /ORGANISATIONS --------------------
app.use("/organisations", organisations);
// USING ROUTE FOR User related activities -----------
app.use("/", authRoutes);

app.use((req,res,next)=>{
    next(new ExpressError(`Page Not Found: ${req.originalUrl}`, 404));
});
app.use((err,req,res,next)=>{
    const {statusCode=500, message="Something Went Wrong!"} = err;
    res.status(statusCode).render('error',{err});
});

app.listen(8999,()=>{
    console.log("server is listening of port 8999");
});