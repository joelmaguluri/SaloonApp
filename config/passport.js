var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var bcrypt=require('bcrypt');
const mongoose=require('mongoose')
const UserSchema = require('../models/User');
const User=mongoose.model('saloonappuser',UserSchema)

//Local Strategy
passport.use(new LocalStrategy({ // or whatever you want to use
  usernameField: 'email',    // define the parameter in req.body that passport can use as username and password
  passwordField: 'password'
},
  function(username, password, done) {
    console.log(password)
    User.findOne({ email: username }, function(err, user) {

      
      if (err) { return done(err); }

      if (user==null) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      else
      {
        
        bcrypt.compare(password, user.password, function(err, res) {
        
         if(res==true)
         {
         
          return done(null, user);
         }

         else
         {
          console.log('in false')
          return done(null, false, { message: 'Incorrect password.' });

         }
 
          
        }); 

      }
  
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports=passport;