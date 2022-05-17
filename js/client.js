const socket = io("http://localhost:8000");
// Get DOM elements in respective Js variables
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

//Audio that will play on recieving messages
var audio= new Audio('dingsound.mp3')


//Function which will append event info to the container
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add( position);
  messageContainer.append(messageElement);
  
  if(position=='right'){
    audio.play();
  }
};
 //If the form gets submitted ,send serverthe message 
form.addEventListener('submit',(e)=>{
e.preventDefault();
const  message =messageInput.value;
append(`You: ${message}`,'right');
socket.emit('send',message);
messageInput.value='';
})
  
//Ask new user for his/her name
let name = prompt("Enter your name to join");
socket.emit("new-user-joined", name);

//If new user joins,let  recieve his/her name  from server

socket.on("user-joined", (name) => {
  append(`${name} joined the chat`, "right");
});
//If server sends the message,receive it
socket.on("receive", data => {
  append(`${data.name}: ${data.message}`, "left");
   
});

//If user leaves the chat ,append the info to the container
socket.on("left", name => {
  append(`${name}: left the chat`, "right");
   
});
 