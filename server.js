const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const session = require("express-session");
const cookieParser = require('cookie-parser');

// Create node server
const http = require("http");
const server = http.createServer(app);

// Create socket server and bind to node server
const {Server} = require("socket.io");
const io = new Server(server);

app.set('view engine', 'ejs');
app.set('socketio', io);
app.use(express.static("public"))
app.use(bodyparser());
app.use(cookieParser());
app.use(session({secret: "93uwu92349ij2i3409"}));

const indexRouter = require("./routes/index"); 
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const updateRouter = require("./routes/update");
const dashboardRouter = require("./routes/dashboard");
 
app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/login",  loginRouter);
app.use("/update", updateRouter);
app.use("/dashboard", dashboardRouter);

app.locals.users = {};

// Listen for socket events
io.on("connection", (socket) => {
    console.log("Socket connect: ", socket.id);

    // Check if user is logged in
    if(app.locals.currentUserId > 0){
        console.log("user is logged in at the moment");

        // Save current socket id
        app.locals.currentSocketId = socket.id;

        // Bind and save current user id and socket id
        app.locals.users[app.locals.currentSocketId] = app.locals.currentUserId;

        console.log(app.locals.users);
    }

    // Disconnect socket
    socket.on("disconnect", () => {
        console.log("bye, ", socket.id);

        delete app.locals.users[socket.id];

        console.log(app.locals.users);  
    });

});

server.listen(3000);