	const express = require('express');
	const app = express();
	const bodyParser = require('body-parser');
	const mongoose = require('mongoose');

	app.use(bodyParser.json());

	User =require('./models/user');
	Todo =require('./models/todo');

	// Connect to Mongoose
	mongoose.connect('mongodb://localhost:27017/usertodo');
	var db = mongoose.connection;


	app.get("/",(req,res)=>{
		res.send("Hi, I am From NodeJS");
	});


	//get all users

	app.get("/api/v1/users",(req,res)=>{
		User.getUsers((err,user)=>{
			if(err){
				throw err;
			}
			res.json(user);
		});
	})



	// add user to users collection mongodb
	app.post('/api/v1/users',(req,res)=>{
		var user=req.body;
		User.addUser(user,(err,user)=>{
			if(err){
				throw err;
			}
			res.json(user);
		});
	})

	// get all todos
	app.get("/api/v1/todos",(req,res)=>{
		Todo.getTodos((err,todo)=>{
			if(err){
				throw err;
			}
			res.json(todo);
		});
	})

	//get todo to based on unique id
	app.get("/api/v1/todos/todo-id/:id",(req,res)=>{
		Todo.getTodoById(req.params.id,(err,todo)=>{
			if(err){
				throw err;
			}

			res.json(todo);
		});
	})

	// get all todos based on user id
	app.get("/api/v1/todos/todo-userid/:id",(req,res)=>{
		Todo.getActiveTodoByUserId(req.params.id,(err,todo)=>{
			if(err){
				throw err;
			}

			res.json(todo);
		});
	})


	// add todo to todos list
	app.post('/api/v1/todos',(req,res)=>{
		var todo=req.body;
		Todo.addTodo(todo,(err,todo)=>{
			if(err){
				throw err;
			}
			res.json(todo);
		});
	})

	

	let activeUserList=function(){
		return new Promise(function(resolve, reject){


			User.getActiveUsers( (err,users)=>{
				if(err)
					throw err;
				//console.log(users);
				resolve(users);

			});
		});
	}


	let todoList= function(users){
		return new Promise(function(resolve,reject){

			Todo.getTodos((err,todo)=>{
				if(err)
					throw err;
				var list=[];
				for(var i=0;i<users.length;i++){
					var obj={};
					obj["id"]=users[i].id;
					obj["fName"]=users[i].fName;
					obj["lName"]=users[i].lName;
					obj["email"]=users[i].email;
					obj["birthDate"]=users[i].birthDate;
					obj["pinCode"]=users[i].pinCode;
					obj["isActive"]=users[i].isActive;
					obj["todoList"]=[];
					var arr=[];
					for(var j=0;j<todo.length;j++){
						if(todo[j].userid==users[i].id){
							obj.todoList.push(todo[j]);
						}
					}
					list.push(obj);
					
					
				}
				resolve(list);

			});
		});
	}


	//get all active users with related todo's
	app.get("/api/v1/users/active",(req,res)=>{

		activeUserList().then(function(users){
			return todoList(users,res);
		}).then(function(list){
			res.json(list);
		});
	});

	

	let userList=function(id){
		return new Promise(function(resolve, reject){


			User.getUserById(id, (err,users)=>{
				if(err)
					throw err;
				//console.log(users);
				resolve(users);

			});
		});
	}

	let activeTodoList=function(id,users){
		return new Promise(function(resolve,reject){
			
			Todo.getActiveTodoByUserId(id, (err,todo)=>{
				var list=[];
				if(err)
					throw err;
				console.log(todo);
				for(var i=0;i<users.length;i++){
					var obj={};
					obj["id"]=users[i].id;
					obj["fName"]=users[i].fName;
					obj["lName"]=users[i].lName;
					obj["email"]=users[i].email;
					obj["birthDate"]=users[i].birthDate;
					obj["pinCode"]=users[i].pinCode;
					obj["isActive"]=users[i].isActive;
					obj["todoList"]=[];
					for(var j=0;j<todo.length;j++){
						obj.todoList.push(todo[j]);
					}

					list.push(obj);
				}

				resolve(list);

			});

		});
	}


	//get all users with realted active todo's
	app.get("/api/v1/users/user-id/:id",(req,res)=>{

		userList(req.params.id).then(function(users){
			return activeTodoList(req.params.id,users);
		}).then(function(list){
			res.json(list);
		});
	});

	//get all today's and tomorrow's todolist based an userid
	app.get("/api/v1/todos/todo-userid/:id/date-check",(req,res)=>{

		Todo.getTodoByUserId(req.params.id,(err,todo)=>{
			if(err){
				throw err;
			}
			var months = new Array("Jan", "Feb", "Mar", 
				"Apr", "May", "Jun", "Jul", "Aug", "Sep", 
				"Oct", "Nov", "Dec");

			var d = new Date();
			var today=(d.getDate() + "-" + months[d.getMonth()] 
				+ "-" + d.getFullYear()).toLowerCase();
			var t = new Date();
			t.setDate(t.getDate()+1);
			var tomorrow=(t.getDate() + "-" + months[t.getMonth()] 
				+ "-" + t.getFullYear()).toLowerCase();

			var arr=[];
			for(var i=0;i<todo.length;i++){
				var date=todo[i].targetDate.toLowerCase();
				if(date==today||date==tomorrow){
					arr.push(todo[i]);
				}
			}

			res.json(arr);
		});
	})

	app.listen(3000);
	console.log("connecting to 3000..");
