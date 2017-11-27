 const mongoose = require('mongoose');

// Todo Schema
const todoSchema = mongoose.Schema({
	id:{
		type:String,
		require:true
	},
	userid:{
		type:String,
		require:true
	},
	text:{
		type:String,
		require:true
	},
	done:{
		type:Boolean,
		require:true
	},
	targetDate:{
		type:String,
		require:true
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

const Todo=module.exports=mongoose.model('todo',todoSchema);

module.exports.getTodos=(callback,limit)=>{
	Todo.find(callback).limit(limit);
}

module.exports.addTodo=(todo,callback)=>{
	Todo.create(todo,callback);
}

module.exports.getActiveTodoByUserId=(id,callback)=>{
	Todo.find({"userid":id,"done":false},callback);
}

module.exports.getTodoById=(id,callback)=>{
	Todo.find({"id":id},callback);
}

module.exports.getTodoByUserId=(id,callback)=>{
	Todo.find({"userid":id},callback);
}