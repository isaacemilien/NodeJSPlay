var mysql = require("mysql");

var con = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "test"
});

con.connect((err) =>{
    if(err) throw err

    console.log("Successfully connected");
});

module.exports = con;