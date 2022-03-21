const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

var con = require("../database/connect");
const { format } = require("../database/connect");
const res = require("express/lib/response");

router.get("/", (req, res) => {
    res.render("update");
});

router.post("/updateShit", (req, res) => {
    // get information from req
    const username = req.body.username
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    // update in database
    con.query(`UPDATE tblStudents SET Username = ${con.escape(username)}, Password = ${con.escape(hashedPassword)} WHERE StudentId = ${req.session.currentUserId}`, (err, queryResult) => {
        if(err) throw err;
    });
});

module.exports = router;