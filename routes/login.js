const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

var con = require("../database/connect")
var currentSocketId;

router.get("/", (req, res) => {
    const io = req.app.get("socketio")
    io.on("connection", (socket) => {
        currentSocketId = socket.id;
    })
    
    res.render("login");
});

// response to 'create' form action
router.post("/", (req, res) => {
    // Check if username alread exists in database, by seeing if users with the corresponding details can be selected
    con.query(`SELECT * FROM tblStudents WHERE username = "${req.body.username}"`, (err, queryResult)=>{
    
        // Catch any errors
        if(err) return err;

        // Check to see number of results from sql query
        if(queryResult.length > 0){
            // get hashed password
            var hashedPassword = queryResult[0].Password;

            // problem was that the password length needs to be 60 chars long in database table
            if(bcrypt.compareSync(req.body.password, hashedPassword)){
                // Get user socket id


                // Save socket id to session
                req.session.currentSocketId = currentSocketId;

                // Save user id to session
                req.session.currentUserId = queryResult[0].StudentId;
                res.redirect("dashboard");
            }
            else{
                res.send("incorrect details")
            }

        }
        else{
            res.send("Account does not exist");
        }
    });
});


module.exports = router;