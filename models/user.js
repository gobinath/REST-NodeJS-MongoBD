const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema({

	id:{
		type:String,
		required:true
	},
	fName:{
		type: String,
		required: true
	},
	lName:{
		type: String,
		required: true
	},
	email:{
		type: String,
		required:true
	},
	pinCode:{
		type: Number,
		required: true
	},
	birthDate:{
		type: String,
		required:true
	},
	isActive:{
		type: Boolean,
		required:true
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

const User=module.exports=mongoose.model('users',userSchema);

module.exports.getUsers=(callback,limit)=>{
	User.find(callback).limit(limit);
}

module.exports.addUser=(user,callback)=>{
	User.create(user,callback);
}

module.exports.getUserById=(id,callback)=>{
	User.find({"id":id},callback);
}

module.exports.getActiveUsers=(callback,limit)=>{
	User.find({"isActive":true},callback).limit(limit);
}