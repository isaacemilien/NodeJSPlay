const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const con = require("../database/connect")
const dbUtils = require("../database/dbUtils")

const findStudent = dbUtils.findStudent;

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
    
    // check if student exist under given username
    findStudent(req.body.username).then((queryResult) => {
        if(queryResult.length > 0){
            // get hashed password
            var hashedPassword = queryResult[0].Password;

            // problem was that the password length needs to be 60 chars long in database table
            if(bcrypt.compareSync(req.body.password, hashedPassword)){
                // Save user details to session
                req.session.currentSocketId = currentSocketId;
                req.session.currentUsername = queryResult[0].Username;
                req.session.currentUserId = queryResult[0].StudentId;

                // Save user details locally 
                req.app.locals.currentUserId = queryResult[0].StudentId;

                res.redirect("dashboard");  
            }
            else{
                res.send("incorrect details")
            }
        }else{
            res.send("account does not exist")
        }
    });
});

module.exports = router;