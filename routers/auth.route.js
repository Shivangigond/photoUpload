const express = require('express');
const routers = express.Router();
const AuthController = require('../controllers/auth.controller');
const path = require('path');
let ejs = require('ejs');
const db = require('../db/db');
const upload = require('../multerUpload');
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
            
        } else {
            isSingInSuccess = true;
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
    const name=req.body.name;
    const query = "Select * from User where email=?";
    db.get(query, [email], function (err, rowData) {
        if (rowData === undefined) {
            const stmt = db.prepare("INSERT INTO User(email, password, name) VALUES (?,?,?)");
            stmt.run([email, password, name])
            res.redirect('/auth/signIn');
        } else {
            res.redirect('/auth/signUp')
        }
    })
});

routers.get('/home', (req, res, next) => {
    if (isSingInSuccess) {
        const filePath = path.resolve(path.join(__dirname, '..', 'views', 'html2', 'home.ejs'));
        ejs.renderFile(filePath, {}).then(fileContent => {
            res.send(fileContent);
            res.end();
        })
    } else {
        res.redirect('/auth/SignIn')
    }

});

routers.post('/doFileUpload', upload, (req,res,next) => {
    console.log(req);
    console.log(req.body.file);
    console.log(req.file)
    res.send('hello')
})
// routers.post('/signup', AuthController.Signup);

// routers.post('/signIn', AuthController.SignIn);

// routers.get('/signInPage', (req, res, next) => {
//     const loginPath = path.resolve(path.join(__dirname, '..', 'views', 'html', 'login.html'));
//     res.sendFile(loginPath)

//     // res.json({msg: 'hello'})
// })
// routers.get('/signup', (req, res, next) => {
//     const signPath = path.resolve(path.join(__dirname, '..', 'views', 'html', 'sign.html'), "gourav");
//     res.sendFile(signPath)

//     // res.json({msg: 'hello'})
// })
// routers.get('/upload', (req, res, next) => {
//     const image = [];
//     const uploadPath = path.resolve(path.join(__dirname, '..', 'views', 'html', 'upload.html'), images
//     );
//     res.sendFile(uploadPath)

//     // res.json({msg: 'hello'})
// })

// routers.get('/temp', (req, res, next) => {
//     const filePath = path.resolve(path.join(__dirname, '..', 'views', 'html', 'temp.ejs'));
//     const photosData = [{name: 'xyz', imageUrl: 'htp//', descript: 'ddkdk'}]
//     console.log(ejs.compile())
//     ejs.renderFile(filePath,{name: "souravh", data: ["gourav", "sourabh", 'xyz', 'shdkdk'], photos: photosData}).then(val => {
//         res.end(val)
//     })
// })


module.exports = routers;