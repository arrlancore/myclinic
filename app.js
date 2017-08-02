// setup express
const express=require('express');
const app=express();
// load other dependencies
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');
const passport=require('passport');
const config=require('./config/database');
const mongoose=require('mongoose');
// Connect to database
mongoose.connect(config.database);
// On connection db
mongoose.connection.on('connected', ()=>{
	console.log("Connected to db " + config.database);
})
// On connection error
mongoose.connection.on('error', (err)=>{
	console.log("database error " + err);
})

// Config the port number
const port= 4000; //process.env.PORT || 8080;

const users=require('./route/users');
const medicals=require('./route/medicals');

// CORS middleware
app.use(cors());

// Body parser middleware
app.use(bodyParser.json())

// Parser middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// User route
app.use('/users', users);
// User route
app.use('/medicals', medicals);
// Medicals route
//  app.use('/medicals', medicals);
// Index route
app.get('/', (req, res)=>{
	res.send('Invalid Endpoint');
});

app.get('*',(req,res)=>{
	res.sendFile(path.join(__dirname, 'public/index.html'));
})

// error handling middleware
app.use(function(err,req,res,next){
	// console.log(err);
	res.status(422).send({error:err.message})
});

// Start server
app.listen(port, () =>{
	console.log("Server started listening on the port number: "+port);
});
