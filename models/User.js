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







// Fire a function after a 'save' occurs

//We are going to use  Schema.pre  to hash our passwords (using bcrypt) before saving to db
// fire a function before doc saved to db
registrationSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });


registrationSchema.statics.loginUser = async function(email, password){

  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password' + "given password :"+ password + user.password);
  }
  throw Error('incorrect email' + email);
};

// registrationSchema.statics.findOrCreate = async function(id){

//   //find 
//   //or create

//     const user = await this.findById(id , function(err,result){ //returns document

//       if(err){ // no users found, then create
//         return this.create({id: id});  
//       }

//       return user;


//     });


// }

const User = mongoose.model('User' , registrationSchema);


//export our User model
module.exports = User ;