const { Double } = require('bson');
const mongoose = require('mongoose');
const { float } = require('webidl-conversions');

const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    capital: {
        type: String,
        required: true,
        trim: true
    },
    region: {
        type: String,
        trim: true
    },
    GDP: {
        type: Number,    
        min: 0        
    },
    population: {
        type: Number,
        min: 0           
    },
    currency: {
        type: String,
        trim: true
    },
    flag: {
        type: String,    // This will store image path or URL
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;