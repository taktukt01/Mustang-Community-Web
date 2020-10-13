const User = require('../models/User');


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


  module.exports.register_get = (req,res)=>{
    res.render('register');
}

module.exports.register_post = async (req,res)=>{


    const first = req.body.firstName;
    const last = req.body.lastName;
    const email = req.body.email;
    const pw = req.body.password;
   //need to handle errors ( minlength, duplicate email, etc)
     try {
       const user =  await User.create({
   firstName: first,
   lastName : last ,
   email:email,
   password: pw,
   
       });
   
       user.save();
         
   
       res.status(201).json(user);
     }
     catch(err) {
       const errors = handleErrors(err);
       res.status(400).send(errors);
     }
    

}

