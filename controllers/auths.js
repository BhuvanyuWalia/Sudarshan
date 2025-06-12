const User = require("../models/user.js");

module.exports.renderRegisterForm = (req,res)=>{
    res.render("auth/register");
};

module.exports.registerNewUser = async (req,res)=>{
    try{
        let {username, email, password} = req.body;
        let newUser = new User({username, email});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) =>{
            if(err){
                return next(err);
            }
            const redirectUrl = req.session.returnTo || '/home';
            delete req.session.returnTo;
            req.flash("success","Welcome to Sudarshan!");
            res.redirect(redirectUrl);
        });
    } catch(e){
        req.flash("error",e.message);
        res.send("Error : "+ e.message);
    }
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("auth/login");
};

module.exports.loginUser = (req,res)=>{
    const redirectUrl = req.session.returnTo || '/home';
    delete req.session.returnTo;
    req.flash("success","Welcome Back!");
    res.redirect(redirectUrl);
};

module.exports.logoutUser = (req,res)=>{
    req.logout(()=>{
        req.flash("success","You have logged out!");
        res.redirect("/home");
    });
};