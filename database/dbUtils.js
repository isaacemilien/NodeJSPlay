const con = require("./connect");

function findStudent(username){
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM tblStudents WHERE username = "${username}"`, (err, queryResult)=>{
            // Catch any errors
            if(err) reject(err);
    
            // Check to see number of results from sql query
            resolve(queryResult);
        });
    });
}

module.exports = {findStudent}