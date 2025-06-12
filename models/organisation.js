const mongoose = require('mongoose');

const organisationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,      // Removes spaces at start/end
        unique: true     // No duplicate organizations
    },
    headquarters: {
        type: String,
        required: true,
        trim: true
    },
    formation_date: {
        type: Date
    },
    purpose: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    logo: {
        type: String,    // This will store image path or URL
        required: true
    }
});

const Organisation = mongoose.model("Organisation", organisationSchema);

module.exports = Organisation;