const session = require("express-session");

const sessionMiddleware = session({secret: "93uwu92349ij2i3409"});

const wrap = expressMiddleware => (socket, next) => expressMiddleware(socket.request, {}, next );

module.exports = {sessionMiddleware, wrap};


