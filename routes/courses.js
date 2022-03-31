const express = require("express")
const router = express.Router();
var con = require("../database/connect")

const courseNames = {1 : "math", 2 : "english"}

router.get("/", (req, res) => {
    res.render("courses");
})

router.post("/", (req, res) => {
    // Check if student already has course
    con.query(`SELECT * FROM tblStudentSubjects WHERE StudentId = "${req.session.currentUserId}" and SubjectId = "${req.body.course}"`, (err, queryResult) => {
        if(err) throw err;

        if(queryResult.length === 0){
            // Add subject to students list
            con.query(`INSERT INTO tblStudentSubjects(StudentId, SubjectId) VALUES("${req.session.currentUserId}", "${req.body.course}")`, (err, queryResult) => {
                if(err) throw err;

                console.log("New subject added to student account");
                res.redirect(`courses/${courseNames[req.body.course]}`)
            });
        }else{
            console.log("Studend already has course");
            res.redirect(`courses/${courseNames[req.body.course]}`)
        }
    });
});

router.get("/math", (req, res) => {
    if(req.session.currentUserId > 0){
        res.render("math");
    }
    else{
        res.redirect("/");
    }
})

router.get("/english", (req, res) => {
    if(req.session.currentUserId > 0){
        res.render("english");
    }
    else{
        res.redirect("/");
    }
})

module.exports = router;