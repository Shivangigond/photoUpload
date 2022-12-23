const express = require('express');
const app = express();
const AuthRoute = require('./routers/auth.route');
var bodyParser = require('body-parser')
const db = require('./db/db')

var cookieParser = require('cookie-parser');
var session = require('express-session');


app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));
app.use('/upload-pic/', express.static(__dirname + '/uploads'));
app.use('/assets/', express.static(__dirname + '/assets'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/auth', AuthRoute);

app.use('/nex', (req,res, next) => {
    res.send('hello2')
})

app.use("/", (req,res, next) => {
    res.send('hello')
})


app.listen(3000, () => {
    console.log('listen')
});