const User = require('../models/User');

require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwt_secret = process.env.JWT_SECRET;
var bcrypt = require('bcryptjs');




// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  console.log(err.message);

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


// intiially, only taktukgg@gmail.com is admin. later on he can promote other regular members



/*


JWT.verify 
(Synchronous) If a callback is not supplied, function acts synchronously. 
Returns the payload decoded if the signature is valid and optional expiration, audience, or issuer are valid. 
If not, it will throw the error.

jwt.verify(token, secretOrPublicKey, [options, callback])
 Source: https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
  */

  // our payload ..


// JWT: parameters -  (payload, secretOrPrivateKey, options => expiresIn)
//  payload contains that data we want to store in the cache 
//secretorPrivateKey : our secret key 
//7200 seconds  = 2 hours
// our secret key and the payload are combined and passed into the hashing algorithm which will generate a token for us
const createToken = (id)=>{

  return jwt.sign({id} , jwt_secret , {
    expiresIn: 2 * 60 * 60
  });
}




  

  module.exports.login_get =  (req,res)=>{
    res.render('login');
  }

  module.exports.login_post = async (req,res)=>{
  

    const email = req.body.email;
    const password =req.body.password;


  try{

   const user = await User.loginUser(email,password);
  //  const isAdmin = await Admin.findById(user.id);   // returns Obj or null
  //  console.log(isAdmin);
   const token = createToken(user._id);
   
       //res.cookie(NAME, value , options)
       res.cookie('jwt',token,{
        httpOnly: true,
        expires: new Date(Date.now() + 7200000)  // 7,200,000ms = 120 min = 2 hours
       });
   res.status(200).json( {user});
      }
  // res.redirect("/");

  //  res.render('register' , {
  //    user: user._id ,
  //  })
  catch(err){
    const errors = handleErrors(err);
    res.status(400).json({ errors });}
   
  }

  module.exports.remove_all_docs = (req,res)=>{
    User.deleteMany({} , function(err){
      if(err){
        res.send(err);
      }
      
    });

  }

//expiresIn: expressed in seconds or a string describing a time span zeit/ms.




// (Asynchronous) If a callback is supplied, the callback is called with the err or the JWT.



  module.exports.register_get = (req,res)=>{
    res.render('register');
}

/*

const createToken = (id)=>{

  return jwt.sign({id} , jwt_secret , {
    expiresIn: 2 * 60 * 60
  });
}

*/

module.exports.register_post = async (req,res)=>{

   //need to handle errors ( minlength, duplicate email, etc)
     try {

    // const first = req.body.firstName;
    // const last = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;

 

  const user =  await User.create({

   email,
   
  password ,
   isAdmin : false,
    firstName
   
  });


  

       const token = createToken(user._id);
       //res.cookie(NAME, value , options)
       res.cookie('jwt',token,{
        httpOnly: true,
        expires: new Date(Date.now() + 7200000)  // 7,200,000ms = 120 min = 2 hours
       })

       res.json({ user: user._id }); // redirect to home page...
      // res.redirect("/"); // automatically log user in after they register...
      
      }
     catch(err) {
       const errors = handleErrors(err);
       res.status(400).json({ errors });
      }
    

}

module.exports.logout = async (req,res)=>{
  //clear token 
  //redirect to index
  //source: https://stackoverflow.com/questions/27978868/destroy-cookie-nodejs

  res.clearCookie('jwt');
  res.redirect("/");
}


module.exports.admin_get = async(req,res)=>{
//  Used to return all the regular members
/*
 the find() method returns all the documents when an empty object is passed. 
*/
 await User.find({"isAdmin": false}, (err,result)=>{
  if(err){
    res.json(err);
  } 
  // result is an array of objects... 
  res.render("admin/admin" , {
    data: result,  

  });

});
}

module.exports.admin_post_delete= async(req,res)=>{

  const user = await User.findByIdAndDelete(req.body.id);


}

module.exports.admin_post_update= async(req,res)=>{
  const user = await User.findByIdAndUpdate(req.body.id , {
      isAdmin: true,
    });
}


module.exports.adminHome_get = async(req,res)=>{

res.render("admin/adminHome");

}