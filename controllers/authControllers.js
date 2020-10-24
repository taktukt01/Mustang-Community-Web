const User = require('../models/User');

require('dotenv').config()
const jwt = require('jsonwebtoken');

const jwt_secret = process.env.JWT_SECRET;




// handle errors : following tutorial of : The Net Ninja: https://www.youtube.com/watch?v=nukNITdis9g&t=16s
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      // console.log(err);
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }



  

  module.exports.login_get = (req,res)=>{
      res.render('login');
  }

  module.exports.login_post = (req,res)=>{

  try{
  
  User.find({ email: req.body.loggedEmail,
     password: req.body.loggedPass
    }, function(err,doc){
      if(err){
  
        res.status(400).send(err);

    }else{

        // var userName = {
        // firstName: doc.firstName,
        // lastName: doc.lastName,
        // }

        // Redirect to home page with doc.firstName 
        res.status(201).json(doc);

        // res.send(doc);



        // returns the user object 
        // [{"_id":"5f82355e39793b0471a953b1","firstName":"tak","lastName":"tuk","email":"email@gmail.com","password":"password123","__v":0}]
      }
    })

  }catch(err){
    const errors = handleErrors(err);
    res.status(400).send(errors);
  }

}

//expiresIn: expressed in seconds or a string describing a time span zeit/ms.


// JSON WEB TOKEN
// payload, secretKey, options => expiresIn
//7200 seconds  = 2 hours
const createToken = (id)=>{

return jwt.sign({id} , jwt_secret , {
  expiresIn: 2 * 60 * 60
})

// (Asynchronous) If a callback is supplied, the callback is called with the err or the JWT.


}

  module.exports.register_get = (req,res)=>{
    res.render('register');
}

module.exports.register_post = async (req,res)=>{

   //need to handle errors ( minlength, duplicate email, etc)
     try {

    const first = req.body.firstName;
    const last = req.body.lastName;
    const email = req.body.email;
    const pw = req.body.password;

       const user =  await User.create({
   firstName: first,
   lastName : last ,
   email:email,
   password: pw,
   
       });

       const token = createToken(user._id);
       //res.cookie(NAME, value , options)
       res.cookie('jwt',token,{
        
        httpOnly: true,
        expires: new Date(Date.now() + 7200000)  // 7,200,000ms = 120 min = 2 hours
       })
// now we have a cookie that is storing our JWT


       //  jwt.sign(payload, secretOrPrivateKey, [options, callback])
      // secret key will be in our .env
      //payload is our Schema _id property
      //options : expiresIn  :  24 * 60 * 60 = 1 day..  we want.. 2 * 60 * 60 ... 2 hours..

   
      //  user.save();
         
   
       res.status(201).json(user._id);
     }
     catch(err) {
       const errors = handleErrors(err);
       res.status(400).send(errors);
     }
    

}

