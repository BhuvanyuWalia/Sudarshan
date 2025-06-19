const Country = require("../models/country");
const mbxGeoCoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeoCoding({ accessToken: mapToken });

module.exports.getCountries = async (req,res)=>{
    const countries = await Country.find({});
    res.render("country/countries.ejs",{countries, query:{}});
};

module.exports.postNewCountry = async (req, res) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.country.capital,
        limit: 1
    })
    .send();
    if (!req.file) {
        req.flash("error", "Flag image is required.");
        return res.redirect("/countries/new");
    }
    const newCountry = new Country(req.body.country);
    newCountry.flag = req.file.path;
    newCountry.author = req.user._id;
    newCountry.geometry = response.body.features[0].geometry;
    await newCountry.save();
    req.flash("success", "New Country Added!");
    res.redirect("/countries");
};

module.exports.showCountry = async (req,res)=>{
    let country = await Country.findById(req.params._id).populate("author");
    res.render('country/show_country.ejs',{country});
};

module.exports.updateCountry = async (req,res)=>{
    let {_id} = req.params;
    const country = await Country.findByIdAndUpdate(_id, req.body.country);
    if(req.file){
        country.flag = req.file.path;
        await country.save();
    }
    req.flash("success","Country Updated Successfully!");
    res.redirect(`/countries/${_id}`);
}

module.exports.deleteCountry = async (req,res)=>{
    let {_id} = req.params;
    try {
        const country = await Country.findByIdAndDelete(_id);
        console.log("Country deleted -",country);
    } catch(err){
        console.log("Error deleting country -",err);
    }
    req.flash("success","Country Deleted!");
    res.redirect("/countries");
}

module.exports.findCountry = async (req, res) => {
  const { name, capital, region, currency, minPop, maxPop, minGDP, maxGDP } = req.query;
  const filter = {};

  if (name)      filter.name    = new RegExp(name,    'i');
  if (capital)   filter.capital = new RegExp(capital, 'i');
  if (currency)  filter.currency= new RegExp(currency, 'i');

  // region may be string or array
  if (region) {
    const regions = Array.isArray(region) ? region : [region];
    filter.region = { $in: regions };
  }

  if (minPop) filter.population = { ...filter.population, $gte: +minPop };
  if (maxPop) filter.population = { ...filter.population, $lte: +maxPop };
  if (minGDP) filter.GDP        = { ...filter.GDP,        $gte: +minGDP };
  if (maxGDP) filter.GDP        = { ...filter.GDP,        $lte: +maxGDP };

  const countries = await Country.find(filter);
  res.render('country/countries.ejs', {countries, query: req.query});
}

module.exports.renderEditForm = async (req,res)=>{
    let {_id} = req.params;
    const country = await Country.findById(_id);
    res.render("country/edit_country.ejs",{country});
}

module.exports.renderNewForm = (req,res)=>{
    res.render("country/new_country.ejs");
}