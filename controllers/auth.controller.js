const db = require('../db/db');
function Signup(req, res, next) {
    let body = req.body;
    const email = body.email;
    const name = body.name;
    const password = body.password;
    const query = "Select * from User where email=?";
    db.get(query, [email], function (err, rowData) {
        if (rowData === undefined) {
            const stmt = db.prepare("INSERT INTO User(email, password, name) VALUES (?,?,?)");
            stmt.run([email, password, name])
            stmt.finalize(err => {
                res.json({ msg: 'Success' });
            })
        } else {
            res.json({ msg: 'Already exist' });
        }
    });
};
function SignIn(req, res, next) {
    let body = req.body;
    var loginid = body.loginid;
    var passwordofuser = body.passwordofuser;
    const query = "Select * from User where email =? AND password=?";
    db.get(query, [loginid, passwordofuser], function (err, rowData) {
        if (rowData == undefined)
            res.json({ msg: 'no you are not autorized person' });
        else {
            res.json({ msg: 'you are autorized person' });
        }
    })
};

exports.Signup = Signup;
exports.SignIn = SignIn;