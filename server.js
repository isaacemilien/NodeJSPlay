const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const session = require("express-session");
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use(bodyparser());
app.use(cookieParser());
app.use(session({secret: "93uwu92349ij2i3409"}));

const indexRouter = require("./routes/index"); 
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const updateRouter = require("./routes/update");

app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/login",  loginRouter);
app.use("/update", updateRouter);

app.listen(3000);