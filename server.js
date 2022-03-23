const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const http = require("http");
const server = http.createServer(app);
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

// // Log their id when they join
// io.on("connection", (socket) => {
//   console.log(socket.id);

//   socket.on("disconnect", (socket) => {
//     console.log("bye bitch");
//   })
// });

// // Get message
// io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     console.log(socket.id + ' : ' + msg);
//   });
// });

// // Emit event to all connected clients
// io.on("connection", (socket) => {
//   socket.emit("msg", "world");
// });

server.listen(3000);