const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    Firstname: {
        type: String,
        required: true
    },
    Lastname: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Role:{
        type:String,
        required :true
    }
});

// Create the User model from the schema and export it
const User = mongoose.model('User', userSchema);

module.exports = User;
