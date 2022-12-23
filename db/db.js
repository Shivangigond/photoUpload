const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.sqlite');
db.serialize(() => {
    const userTable = `CREATE TABLE IF NOT EXISTS User (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        email varchar(255),
        password varchar(255),
        name varchar(255)
    );
    `;
    const imageTable = `Create Table IF NOT EXISTS Image (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        LoginId varchar(255),                         
        ImageUrl varchar(255)                   
        );`
    db.run(userTable)
    db.run(imageTable)
});

module.exports = db;