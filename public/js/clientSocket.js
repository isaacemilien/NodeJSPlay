// Create io instance, do not connect to server immediatly, this will be done when user logs in
var socket = io();

// Connects socket
function connectThisBitch(){
    socket.connect();
}

// Listen for connection event
socket.on("connect", () => {
    console.log("Is this forced");
});

var users;

socket.on("updateUsers", (arg) => {
    users = arg;
    console.log(users);

    for(const user in users){
        console.log(user);
    }
})
