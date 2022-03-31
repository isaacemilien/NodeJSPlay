const express = require("express");
const router = express.Router();

var con = require("../database/connect");

router.get("/", (req, res) => {
    // Check if user logged in
    if(req.session.currentUserId > 0){
        // Get students current subjects through join
        con.query(`SELECT tblstudentsubjects.StudentId, tblstudentsubjects.SubjectId, tblsubjects.SubjectName, tblsubjects.SubjectDescription 
        FROM tblStudentSubjects 
        INNER JOIN tblSubjects ON tblstudentsubjects.SubjectId=tblsubjects.SubjectId WHERE StudentId = ${req.session.currentUserId};`, (err, queryResult) => {
            if(err) throw err;

            // Create object to users courses
            var currentUserCourses = {}
            
            // Populate object with results from sql statement
            for(i = 0; i < queryResult.length; i++){
                currentUserCourses[queryResult[i].SubjectName] = queryResult[i].SubjectDescription
            }

            // Load page after got subjects, pass subjects to ejs file
            res.render("dashboard", {currentUsername : req.session.currentUsername, currentUserCourses});
        });
    }
    else{
        res.redirect("/");
    }
});

router.get("/tutors", (req, res) => {
    // Check if user logged in
    if(req.session.currentUserId > 0){
        res.render("tutors", {currentUsername : req.session.currentUsername});
    }
    else{
        res.redirect("/");
    }
});

module.exports = router;