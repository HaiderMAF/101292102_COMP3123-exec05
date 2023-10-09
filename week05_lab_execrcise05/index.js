const express = require('express');
const fs = require('fs');
const path = require('path');
const user = require('./user.json');

const app = express();
const router = express.Router();

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/

router.get('/home', (req,res) => {
  res.sendFile('./view/home.html', {root: __dirname});
});
/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  res.send(user);
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req,res) => {
  //accept as query string - request
  let uName = req.query['username'];
  let pass = req.query['password'];

  if(uName == user['username'] && pass == user['password']){
    res.send({status: "true", message: "User is valid"})
    //invalid user but password okay
  } else if(uName != user['username'] && pass == user['password']){
    res.send({status: "false", message: "User Name is invalid"})
  } else { //password invalid but user okay
    res.send({status: "false", message: "Password is invalid"})
  }

});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout', (req,res) => {
  //query user name ?username=bret
  let uName = req.query.username;
  if(uName == user['username']){
    //html
    res.send(`<b>${uName} succesfully logout.</b>`)
  } else {
    res.send({status: "fail", message: uName +" cant logout"})
  }
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));