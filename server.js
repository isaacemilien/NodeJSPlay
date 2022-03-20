var express = require("express");
var app = express();
var bodyparser = require("body-parser");

app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use(bodyparser());

const indexRouter = require("./routes/index"); 
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");

app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/login",  loginRouter);

app.listen(3000);