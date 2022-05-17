//Node server which will handle socket io connection
// const io = require("socket.io")(8000,{
//   cors:{
//     origin:'*',
//   }

// });
const io = require("socket.io")(8000,{
  cors:{
    origin:'*',
  }
}) ;


const users = {};

io.on("connection", (socket) => {
  //If any new user joins,Let other users connected to the server Know!
  socket.on("new-user-joined", (name) => {
    // console.log('New user',name)
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name);
  });

//if someonesend a message ,broadcast it to others



  socket.on("send", (message) => {
     
    socket.broadcast.emit("receive", {
      
      message: message,
      name: users[socket.id],
    });
  });


  //If someone leaves the chat ,let others know
  socket.on("disconnect", (message) => {
     
    socket.broadcast.emit("left",users[socket.id] );
    delete users[socket.id]
      
      
  });
});
