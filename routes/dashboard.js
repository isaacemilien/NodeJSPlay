const express = require("express");
const router = express.Router();

var con = require("../database/connect");

router.get("/", (req, res) => {
    // Check if user logged in
    if(req.session.currentUserId > 0){
        res.render("dashboard");
    }
    else{
        res.send("Area locked");
    }
});

module.exports = router;