# REST-NodeJS-MongoBD

DB setup:

  create db usertodo(use usertodo)
  create collection users(db.createCollection('users'))
  create collection todo(db.createCollections('todo'));
  
  REST URL:
  
  Add to todo collection:

curl -X POST \
  http://localhost:3000/api/v1/todos \
  -H 'accept: application/json' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 71a5d965-3eac-6df6-82df-56240d28a1c3' \
  -d '{
    "id": "8",
    "userid":"102",
    "text":"Python",
    "done":false,
    "targetDate":"29-NOV-2017"
  }'

Add to user Collection:

curl -X POST \
  http://localhost:3000/api/v1/users \
  -H 'accept: application/json' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: eaee934b-e33a-fef4-93f2-9da557e29ec5' \
  -d '{
    "id": "180",
    "fName": "Gobinath",
    "lName": "Velmurugesan",
    "email": "gobinath.gct@gmail.com",
    "birthDate":"17-JUL-1992",
    "pinCode": 123456,
    "isActive": true
  }'

Get userdetails  (for a given userid ) and related active todos:

curl -X GET \
  http://localhost:3000/api/v1/users/user-id/102 \
  -H 'accept: application/json' \
  -H 'cache-control: no-cache' 


Get a specific todo item based on its id:

curl -X GET \
  http://localhost:3000/api/v1/todos/todo-id/1 \
  -H 'accept: application/json' \
  -H 'cache-control: no-cache' 

Get all active users and related todo items:

curl -X GET \
  http://localhost:3000/api/v1/users/active \
  -H 'accept: application/json' \
  -H 'cache-control: no-cache' 

For a specific user (for a given user id ) get active todos which has targetDate as today or tommorow:

curl -X GET \
  http://localhost:3000/api/v1/todos/todo-userid/102/date-check \
  -H 'accept: application/json' \
  -H 'cache-control: no-cache' 
  
    
