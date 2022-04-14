// declaracao de funcoes
function getName() {
    const username = prompt("Qual é o seu nome?");

    if(username === "admin") {
        return username; // para testes, a ser apagado
    }

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants ", {name: username});
    promise.then(function (response) {
        setInterval(updateStatus, 4000, username);
        return username;
    })
    promise.catch(function (error) {
        console.log(error, error.response.status);
        alert("nome invalido ou já em uso, digite novamente");
        getName();
    })
}

function getMessages() {
    const promise = axios.get()
}

function updateStatus(username) {
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", {name: username});
    promise.then(function () {
        console.log("reee conectaldus")
    })
    promise.catch(function (error) {
        alert("Você foi desconectado, conecte-se novamente para continuar");
        // window.reload
    })
}

function start() {
    const username = getName();
    // getMessages();
}

// codigo
start();