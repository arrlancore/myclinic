const mongoose= require('mongoose');
const bcrypt=require('bcryptjs');
const config=require('../config/database');

var Schemas=mongoose.Schema,
ObjectId = Schemas.ObjectId;

// User Scheme
const MedicalSchema=mongoose.Schema({
	_patientId:ObjectId,
	m_record:[{
		complaint:{
			type:String
		},
		lab_result:{
			type:String
		},
		diag_result:{
			type:String
		},
		problem_list:{
			type:String
		},
		plan:{
			type:String
		},
		weight:{
			type:String
		},
		height:{
			type:String
		},
		created_by:{
			type:String
		},
		edited:{
			type:Date, 
			default:Date.now}
	}],
	medical_history:[{
		title:String,
		year:Number
	}],
	medication_history:[{
		name:String,
		status:String
	}],
	allergies:[{
		name:{
			type:String
		},
		allergy_type:{
			type:String
		}

	}],
	fs_history:[{
		name:{
			type:String
		},
		fs_type:{
			type:String
		}
	}],
}
);

const Medical=module.exports=mongoose.model('Medical', MedicalSchema);
