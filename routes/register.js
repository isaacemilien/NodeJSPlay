const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
var con = require("../database/connect");

router.get("/", (req, res) => {
    res.render("register");
});

// response to 'create' form action
router.post("/", (req, res) => {
    // Check if username alread exists in database, by seeing if users with the corresponding details can be selected
    con.query(`SELECT * FROM tblStudents WHERE username = "${req.body.username}"`, (err, queryResult)=>{

        // Catch any errors
        if(err) return err;

        // Check to see number of results from sql query
        if(queryResult.length === 0){
            
            // Salt and hash password
            bcrypt.hash(req.body.password, 10, function(err, hash) {

                // Create account using details
                con.query(`INSERT INTO tblStudents(Username, Password) VALUES("${req.body.username}", "${hash}")`, (err)=>{
                    if(err) return err;
                });
                res.redirect("update");
            });
        }
        else{
            res.send("Username taken");
        }
    });
});

module.exports = router;