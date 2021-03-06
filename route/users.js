const express=require('express');
const userRouter=express.Router();
const passport=require('passport');
const jwt=require('jsonwebtoken');
const config=require('../config/database');
const User=require('../models/user');

// User Register route
userRouter.post('/register', (req, res, next)=>{
	let newUser=new User(req.body);

	User.addUser(newUser, (err, user)=>{
		if(err){
			res.json({success:false, msg:'Failed to register user',err});
		}
		else{
			res.json({success:true, msg:'User success registered'});
			createTemplate(user._id);
		}
	})
});

// update user information
userRouter.put('/edit/:id', function(req,res, next){
	User.findByIdAndUpdate({_id:req.params.id}, req.body).then(function(user){
		User.findOne({_id:req.params.id}).then(function(user){
			res.send(user);	
		});
	});
	
});

// Authenticate route
userRouter.post('/authenticate', (req, res, next)=>{
	const username=req.body.username;
	const password=req.body.password;

	User.getUserByUsername(username, (err, user)=>{
		if (err) throw err;
		if(!user){
			return res.json({success:false, msg:'User not found'});
		}

		User.comparePassword(password, user.password, (err, isMatch)=>{
			if(err)throw err;
			if(isMatch){
				const token=jwt.sign(user, config.secret, {
					expiresIn:604800 // 1 week
				});
				res.json({
					success:true,
					msg:'Logged in',
					token: 'JWT '+token,
					user:{
						id:user._id,
						name:user.name,
						username:user.username,
						role:user.role,
						email:user.email,
						phone:user.phone,
						mobile:user.mobile,
						gender:user.gender,
						birth_date:user.birth_date,
						blood_type:user.blood_type,
						address:user.address,
						emergency_contact:{
						name:user.emergency_contact.name,
						role:user.emergency_contact.role,
						phone:user.emergency_contact.phone,
						address:user.emergency_contact.address
						}
						
					}
				});
			}else{
				return res.json({success:false, msg:'Wrong Password'});
			}
		})
	});
});

// see all user data
userRouter.get('/users', function(req,res){
	 User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });
    
    console.log(userMap);
    res.send(userMap);  
  });

});

// find only patient
userRouter.get('/listpatient', function(req,res){
 User.find({ 'role': 'patient' }, function (err, patient) {
  if (err) return handleError(err);
  res.send(patient);
 });
});
// find only doctor
userRouter.get('/listdoctor', function(req,res){
 User.find({ 'role': 'doctor' }, function (err, doctor) {
  if (err) return handleError(err);
  res.send(doctor);
 });
});
// delete user
userRouter.delete('/delete/:id', function(req,res,next){
	User.findByIdAndRemove({_id:req.params.id}).then(function(rem){
		res.send({success:true,rem});
	})
	
});
// find only patient
userRouter.get('/bio/:id', function(req,res,next){
 User.findOne({_id:req.params.id}, function(err, bio) {
  res.send(bio);	
  });
});

// Profile route
//				to protect profile page include passport.authenticate('jwt', {session:false}) as below
// userRouter.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next)=>{
// 	res.json({user:req.user});
// });

const Medical=require('../models/medical');

// Auto create user medical record template
var createTemplate=function(patientID){
	Medical.create({_patientId:patientID});
}

//export userRouter
module.exports=userRouter;