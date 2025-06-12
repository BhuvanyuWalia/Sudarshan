const Joi = require("joi");

module.exports.registerSchema = Joi.object({
    email : Joi.string().email().required().label('Email'),
    username: Joi.string().min(3).max(30).required().label('Username'),
    password: Joi.string().min(6).required().label('Password'),
    'password-c': Joi.ref('password')
});

module.exports.countrySchema = Joi.object({
  country: Joi.object({
    name: Joi.string().trim().required().min(2),
    capital: Joi.string().trim().required().min(2),
    region: Joi.string().valid('Asia', 'Europe', 'Asia/Europe', 'Africa', 'Americas', 'Oceania').required(),
    GDP: Joi.number().min(0).required(),
    population: Joi.number().min(1).required(),
    currency: Joi.string().trim().required().min(2)
  }).required()
});