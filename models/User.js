// Import Mongoose
const mongoose= require('mongoose');
var bcrypt = require('bcryptjs');


//Importing validator rather than doing substring or regex to check.
const { isEmail } = require('validator');


// Create schema
const registrationSchema = new mongoose.Schema({
firstName: {
  type: String, 
  required: [true, "Please enter your first name"],
  
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
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  } ,

  isAdmin :{
    type: Boolean ,
    required: false
  } ,

  // paidMembershipFee:{
  //   type:Boolean,
  //   required: false
  // }




},{
timestamps : {
  createdAt : 'created_at' ,
}
}

);








//We are going to use  Schema.pre  to hash our passwords (using bcrypt) before saving to db
// fire a function before doc saved to db
// hashing the password since we don't want to see user's actual password
registrationSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });



// logging in User
registrationSchema.statics.loginUser = async function(email, password){
  // check to see if current schema has email
  const user = await this.findOne({ email });
  //finds the User, otherwise returns null
  if (user) {
    //thanks to bcrypt, we can compare our user provided password to the crypted password, stored with the User  
    const auth = await bcrypt.compare(password, user.password);  //returns a Promise boolean
    if (auth) {    
      return user;
    }
    throw Error('incorrect password' + "given password :"+ password + user.password);
  }
  throw Error('incorrect email' + email);
};


//@param email: email to update to
// registrationSchema.statics.updateEmail = async function(email){

//   //get the current email,

//   //then update it to user provided email
//   // can we grab current localStorage 
//   let currentId = cookies.get('jwt');
//   if(currentId){
//   const user = await this.findOne(currentId);
//   if (user) {

//     return user;

//   }
// }
//   throw Error('incorrect email' + email);
// };

const User = mongoose.model('User' , registrationSchema);


//export our User model
module.exports = User ;