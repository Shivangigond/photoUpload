// const { Sequelize } = require('sequelize');


// Option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'database.sqlite'
// });

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
    // db.run("CREATE TABLE lorem (info TEXT)");

    // const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    // for (let i = 0; i < 10; i++) {
    //     stmt.run("Ipsum " + i);
    // }
    // stmt.finalize();

    // db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
    //     console.log(row.id + ": " + row.info);
    // });
});

module.exports = db;