var express=require('express');
const app=express();
const PORT=process.env.PORT||5000;
var bodyParser=require('body-parser');
var db=require('./config/dbconnect');
var path=require('path');
var session = require("express-session")
var passport=require('./config/passport')

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');
app.use(bodyParser.json())

// Express body parser
app.use(express.urlencoded({ extended: true }));

//passport configaration

app.use(session({ secret: "cats",
resave: false,
  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


//routes
app.use('/',require('./routes/index'));
app.use('/user',require('./routes/user'));
app.use('/admin',require('./routes/admin'));



app.listen(PORT,console.log(`listening at port ${PORT}`));