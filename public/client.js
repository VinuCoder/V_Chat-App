const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let container = document.querySelector('.container')
do{
    data = prompt('Enter your name to start chating')
} while(!data)

textarea.addEventListener('keyup', (e) =>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})


function sendMessage(message){
    let msg = {
        user: data,
        message: message
    }
    // append
    appendMessage(msg, 'right')
    textarea.value = ''
    scrollToBottom()

    // Send to server
    socket.emit('message', msg)
}


function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h3>${msg.user}</h3>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    container.appendChild(mainDiv)
}


// REcieve message

socket.on('message', (msg) =>{
    appendMessage(msg, 'left')
    scrollToBottom()
}) 


function scrollToBottom(){
    container.scrollTop = container.scrollHeight
}