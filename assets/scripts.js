// variaveis globais
let username;

// declaracao de funcoes

// login
function getName() {
    username = prompt("Qual é o seu nome?");
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants ", {name: username});
    promise.then(response => {
        setInterval(updateStatus, 4000, username);
        return username;
    })
    promise.catch(error => {
        alert("nome invalido ou já em uso, digite novamente");
        getName();
    })
}

function updateStatus(username) {
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", {name: username});
    promise.then(function () {
    })
    promise.catch( error => {
        alert("Você foi desconectado, conecte-se novamente para continuar");
        const promise = axios.post()
        window.location.reload();
    })
}

// carregar mensagens
function buildMessages (message) {
    let text;
    switch(message.type) {
        case "status":
            text = `
                <div class="${message.type}">
                    <p>
                        <span class="lightgrey">(${message.time})</span> 
                        <span class="bold">${message.from}</span>
                        ${message.text}
                    <p>     
                </div>`;
            break;

        case "message":
            text = `
                <div class="${message.type}">
                    <p>
                        <span class="lightgrey">(${message.time})</span>  
                        <span class="bold">${message.from}</span>
                        para
                        <span class="bold">${message.to}:</span>
                        ${message.text}
                    <p>     
                </div>`;
            break;
        
        case "private_message":
            if(username === message.to || username === message.from){
                text = `
                <div class="private">
                    <p>
                        <span class="lightgrey">(${message.time})</span> 
                        <span class="bold">${message.from}</span>
                        reservadamente para: 
                        <span class="bold">${message.to}</span>
                        ${message.text}
                    <p>     
                </div>`;
            } else {
                text = ``
            }
            break;
    }
    return text;
}

function setMessages(response) {

    let chat = document.querySelector(".chat");
    const chatBefore = chat.innerHTML;
    chat.innerHTML = '';

    for(let i = 0; i < response.data.length; i++) {
        chat.innerHTML += buildMessages(response.data[i]);    
    }

    // scroll
    chat.innerHTML += '<div class="reference"></div>';
    if(chatBefore != chat.innerHTML) {
        // scroll somente se chegarem novas mensagens
        document.querySelector('.reference').scrollIntoView();
    }
}

function getMessages() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    promise.then(setMessages);
}

// enviar mensagens
function send(message) {
    const input = document.querySelector("input");
    const myMessage = {
        from: username,
        to: "Todos",
        text: input.value,
        type: "message"
    } 
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", myMessage);
    promise.then((response) => console.log(response));
}

function start() {
    const username = getName();
    setInterval(getMessages, 2000);
}

// codigo
start();