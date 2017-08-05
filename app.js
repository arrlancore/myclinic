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
const compression = require('compression');
// Connect to database
const options = { 
                server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
              };
mongoose.connect(config.database, options);
// On connection db
mongoose.connection.on('connected', ()=>{
	console.log("Connected to db " + config.database);
})
// On connection error
mongoose.connection.on('error', (err)=>{
	console.log("database error " + err);
});

// compress all responses
app.use(compression({ threshold: 0 }))

// Config the port number
const port= process.env.PORT || 8080;

const users=require('./route/users');
const medicals=require('./route/medicals');

// CORS middleware
app.use(cors());

// Body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'})); 

// Parser middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// User route
app.use('/users', users);
// User route
app.use('/medicals', medicals);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

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
var server=app.listen(port, () =>{
	console.log("Server started listening on the port number: "+port);
});
module.exports = server