const mongoose= require('mongoose');
const bcrypt=require('bcryptjs');
const config=require('../config/database');
const uniqueValidator = require('mongoose-unique-validator');


// User Scheme
const UserScheme=mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true,
		unique: true,
		index:true
	},
	username:{
		type:String,
		required:true,
		unique: true,
		index:true
	},
	password:{
		type:String,
		required:true
	},
	role:{
		type:String,
		enum: ['patient', 'doctor', 'admin'],
        default: 'patient'
	},
	address:{
		type:String
	},
	phone:{
		type:String
	},
	mobile:{
		type:String
	},
	gender:{
		type:String,
		required:true
	},
	birth_date:{
		type:Date,
		required:true
	},
	blood_type:{
		type:String,
		required:true
	},
	emergency_contact:{
		name:{
			type:String
		},
		role:{
			type:String
		},
		phone:{
			type:String
		},
		address:{
			type:String	
		}
	},
	doctor_information:{
		active_date:Date,
		specialization:String
	}

},
{
    timestamps: true
}
);
UserScheme.plugin(uniqueValidator, {message: 'is already registered.'});
const User=module.exports=mongoose.model('User', UserScheme);

module.exports.getUserById=function(id, callback){
	User.findById(id,callback);
}

module.exports.getUserByUsername=function(username, callback){
	const query={username: username}
	User.findOne(query,callback);
}

module.exports.addUser=function(newUser, callback){
bcrypt.genSalt(10, (err,salt)=>{
	bcrypt.hash(newUser.password, salt, (err, hash)=>{
		if(err) throw err;
		newUser.password=hash;
		newUser.save(callback);
		
	});
});
}

module.exports.comparePassword=function(candidatePassword, hash, callback){	
	bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
		if (err) throw err;
		callback(null, isMatch);
});

}
