var con = require("./connect")

// Create students table
con.query("CREATE TABLE tblStudents(StudentId INT AUTO_INCREMENT PRIMARY KEY , Username VARCHAR(20), Password VARCHAR(60))", (err) => {
    if(err) throw err
    console.log("Successfully created table");
});

// Create subjects table
con.query("CREATE TABLE tblSubjects(SubjectId INT AUTO_INCREMENT PRIMARY KEY, SubjectName VARCHAR(20), SubjectDescription VARCHAR(200))", (err) => {
    if(err) throw err
    console.log("Successfully created table");
});

// Create StudentsSubjects link table
con.query("CREATE TABLE tblStudentSubjects(StudentId INT, SubjectId INT, FOREIGN KEY(StudentId) REFERENCES tblStudents(StudentId), FOREIGN KEY(SubjectId) REFERENCES tblSubjects(SubjectId))", (err) => {
    if(err) throw err
    console.log("Successfully created table");
});