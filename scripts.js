let API = "https://mock-api.driven.com.br/api/v4/shirts-api/shirts";

let nome = "";

let modeloEscolhido;
let golaEscolhida;
let tecidoEscolhido;

function perguntaNome() {
    nome = prompt("Qual é o seu nome?");
}

perguntaNome();

function selecionarModelo(elemento) {
    let itemSelecionado = document.querySelector(".modelos .selecionado");

    if (itemSelecionado !== null) {
        itemSelecionado.classList.remove("selecionado");
    }

    elemento.classList.add("selecionado");

    modeloEscolhido = elemento.parentNode.classList[1];
    
    ativarBotao();
}

function selecionarGola(elemento) {
    let itemSelecionado = document.querySelector(".golas .selecionado");

    if (itemSelecionado !== null) {
        itemSelecionado.classList.remove("selecionado");
    }
    elemento.classList.add("selecionado");

    golaEscolhida = elemento.parentNode.classList[1];
    
    ativarBotao();
}

function selecionarTecido(elemento) {
    let itemSelecionado = document.querySelector(".tecidos .selecionado");

    if (itemSelecionado !== null) {
        itemSelecionado.classList.remove("selecionado");
    }
    elemento.classList.add("selecionado");

    tecidoEscolhido = elemento.parentNode.classList[1];
    
    ativarBotao();
}

function ativarBotao() {
    if (modeloEscolhido !== undefined) {
        if (golaEscolhida !== undefined) {
            if (tecidoEscolhido !== undefined) {
                                
                let referenciaEscolhida = document.querySelector("input").value;
                let botaoConfirmar = document.querySelector(".secao.botao");
                if (referenciaEscolhida !== "") {
                    botaoConfirmar.classList.add("selecionado");
                    
                } else {
                    botaoConfirmar.classList.remove("selecionado");
                }
            }
        }
    }
}

function confirmarPedido() {
    let objeto = {
        model: modeloEscolhido,
        neck: golaEscolhida,
        material: tecidoEscolhido,
        image: document.querySelector("input").value,
        owner: nome,
        author: nome
    };
    let promessa = axios.post(API, objeto);
    promessa.then(alertaConfirmacao);
    promessa.catch(alertaErro);
}

function alertaConfirmacao() {
    alert("Encomenda confirmada!");
}

function alertaErro() {
    alert("Opa, não conseguimos processar sua encomenda!");
}