// Import Mongoose
const mongoose= require('mongoose');
var bcrypt = require('bcryptjs');

//Importing validator rather than doing substring or regex to check.
const { isEmail } = require('validator');



// Create schema
const registrationSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required: [true, 'Please enter your first name'],

    }
,
    lastName:{
        type: String,
        required: [true, 'Please enter your last name']
    },

    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']

    },
  
    password: {
        type: String,
        required: [true,'Please enter a password'],
        minlength: [6, 'Please choose a stronger password.']

    },
})






// Fire a function after a 'save' occurs

//We are going to use  Schema.pre  to hash our passwords (using bcrypt) before saving to db
// fire a function before doc saved to db
registrationSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

//Create model
const User = mongoose.model('user', registrationSchema);

//export our User model
module.exports = User;