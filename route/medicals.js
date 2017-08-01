const express=require('express');
const medicalRouter=express.Router();
const passport=require('passport');
const jwt=require('jsonwebtoken');
const config=require('../config/database');

const Medical=require('../models/medical');

// See all records
medicalRouter.get('/all', function(req,res){
	 Medical.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    res.send(userMap);  
  });

});

// Get ID medical record by user Id

medicalRouter.get('/m-record/user/:id', function(req,res,next){
	// get the data on body and send to models
	Medical.findOne({_patientId:req.params.id}, function(err, doc) {
  res.send(doc);	
});
});

// Adding new user to medical records
// medicalRouter.post('/m-record', function(req,res,next){
// 	// get the data on body and send to models
// 	Medical.create(req.body).then(function(medic){res.send(medic);
// 	}).catch(next);
// });
//MEDICAL RECORD
// Add new medical record to array
medicalRouter.put('/m-record/:id', function(req,res, next){
	Medical.findByIdAndUpdate(
     {_id:req.params.id},
     { $push: {"m_record": req.body}},
     {  safe: true, upsert: true},
       function(err, model) {
         if(err){
        	console.log(err);
        	return res.send(err);
         }
          Medical.findOne({_id:req.params.id}).then(function(mrecord){
			res.send(mrecord);	
 		});
      });
	
});
// Update medical record by Id
medicalRouter.put('/m-record/update/:id/:mid', function(req,res, next){
		Medical.update({'m_record._id': {_id:req.params.mid}},
      {'$set': {
             'm_record.$': req.body,
	   }},
          function(err,model) {
	   	if(err){
        	console.log(err);
        	return res.send(err);
        }
        Medical.findOne({_id:req.params.id}).then(function(mrecord){
			res.send(mrecord);	
 		});
 });
	});

// Delete medical record by Id
medicalRouter.put('/m-record/delete/:id/:mid', function(req,res,next){
	Medical.update({_id:req.params.id}, { "$pull": { "m_record": { "_id": (req.params.mid) } }}, { safe: true, multi:true }, 
		function(err, obj) {
			if(err){
        	console.log(err);
        	return res.send(err);
        }
        Medical.findOne({_id:req.params.id}).then(function(mrecord){
			res.send(mrecord);	
 		});
	});
});

// MEDICAL HISTORY

// F/S HISTORY

// ALLERGIES

// MEDICATION HISTORY
//export userRouter
module.exports=medicalRouter;