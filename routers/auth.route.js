const express = require('express');
const routers = express.Router();
const AuthController = require('../controllers/auth.controller');
const AuthMiddleWare = require('../middleware/auth.middleware')
const path = require('path');
let ejs = require('ejs');
const db = require('../db/db');
const upload = require('../multerUpload');
const { homedir } = require('os');
let errmessage = null;
let isSingInSuccess = false;
routers.get('/signIn', (req, res, next) => {
    const filePath = path.resolve(path.join(__dirname, '..', 'views', 'html2', 'login.ejs'));
    ejs.renderFile(filePath, { errmessage: errmessage }).then(fileContent => {
        res.send(fileContent);
        errmessage = null;
        res.end();
    })
})

routers.post('/dosignIn', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const query = "Select * from User where email =? AND password=?";
    console.log(query, [email, password])
    db.get(query, [email, password], function (err, rowData) {
        if (rowData == undefined) {
            errmessage = "Not authorized";
            res.redirect('/auth/signIn');

        } 
    
        else {

            req.session['isLogin'] = true;
            req.session['UserId'] = rowData.ID;
            req.session['name'] = rowData.name;
            res.redirect('/auth/home');


        }
    })
    console.log('here')
})

routers.get('/signUp', (req, res, next) => {
    const filePath = path.resolve(path.join(__dirname, '..', 'views', 'html2', 'signup.ejs'));
    ejs.renderFile(filePath).then(fileContent => {
        res.send(fileContent);
        res.end();
    })
});
routers.post('/dosignUp', (req, res, next) => {
    const email = req.body.email; 
    const password = req.body.password;
    const name = req.body.name;
    const query = "Select * from User where email=?";//query to get data where email is gouravgond07@gmail.com
    db.get(query, [email], function (err, rowData) {//check err and undefined
        if (rowData === undefined) {
            const stmt = db.prepare("INSERT INTO User(email, password, name) VALUES (?,?,?)");//Insert data
            stmt.run([email, password, name])
            res.redirect('/auth/signIn');
        } else {
            res.redirect('/auth/signUp')//if error then again sign up
        }
    })
});

routers.get('/home', AuthMiddleWare.authMiddleWare, (req, res, next) => {
    console.log('home', req.session)
    const UserId = req.session['UserId']
 const data=[];
    db.all("SELECT * FROM Image where LoginId="+(UserId), function(err, rows) {
        rows.forEach(function (row) {
            data.push(row.ImageUrl)
          console.log(row.ImageUrl);
          console.log("data",data);
          console.log(data.length)
        });
   console.log(data.length);
    const filePath = path.resolve(path.join(__dirname, '..', 'views', 'html2', 'home.ejs'));
    ejs.renderFile(filePath, {data: data}).then(fileContent => {
        res.send(fileContent);
        const UserId = req.session['UserId']
       // const query = `Select * from Image where LoginId=${UserId}`
        console.log('hi');
       res.end();
        console.log(UserId)
        
       });
       
    })



      
});


routers.post('/doFileUpload', upload, (req, res, next) => {
    console.log(req);
    console.log(req.body.file);
    console.log(req.file)
    const fileURL = `http://localhost:3000/upload-pic/${req.file.filename}`;
    const userId = req.session['UserId']
    console.log(fileURL);
    console.log(userId)
    const loginid = userId;
    const ImageUrl = fileURL;
    const stmt = db.prepare("INSERT INTO Image(LoginId, ImageUrl) VALUES (?,?)");
    stmt.run([loginid, ImageUrl]);
    res.redirect('/auth/home');
 
});

routers.get('/uploadpage', (req, res, next) => {
    const filePath = path.resolve(path.join(__dirname, '..', 'views', 'html2', 'uploadpage.ejs'));
    ejs.renderFile(filePath).then(fileContent => {
        res.send(fileContent);
        res.end();
    })
});
routers.get('/upload', (req, res, next) => {
    const filePath = path.resolve(path.join(__dirname, '..', 'views', 'html2', 'upload.ejs'));
    ejs.renderFile(filePath).then(fileContent => {
        res.send(fileContent);
        res.end();
    })
});
routers.get('/temp', AuthMiddleWare.authMiddleWare, (req, res) => {
    res.send('hii working')
})

module.exports = routers;