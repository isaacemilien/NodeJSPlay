const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

var con = require("../database/connect");

router.get("/", (req, res) => {
    // Check if user logged in
    if(req.session.currentUserId > 0){
        res.render("update");
    }
    else{
        res.send("Area locked");
    }
});

router.post("/", (req, res) => {
    // get information from req
    const username = req.body.username
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    // update in database
    con.query(`UPDATE tblStudents SET Username = ${con.escape(username)}, Password = ${con.escape(hashedPassword)} WHERE StudentId = ${req.session.currentUserId}`, (err, queryResult) => {
        if(err) throw err;
    });
});

// Delete account
router.post("/delete", (req, res) => {
    // Deletion query
    con.query(`DELETE FROM tblstudents WHERE StudentId = ${req.session.currentUserId}`, (err, queryResult) => {
        if(err) throw err;

        console.log("Account successfully deleted");
        res.render("register");
    });
});

module.exports = router;