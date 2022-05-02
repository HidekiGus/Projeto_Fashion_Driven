let API = "https://mock-api.driven.com.br/api/v4/shirts-api/shirts";

let nome = "";

let modeloEscolhido;
let golaEscolhida;
let tecidoEscolhido;
let promessaRequisitaRecentes;
let dadosGet;



perguntaNome();
extraiAPI();

function perguntaNome() {
    nome = prompt("Qual é o seu nome?");
}

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

function pegaIndex(elemento) {

}

function confirmarPedidoUltimosPedidos(elemento) {

    let indice = elemento.classList[1];
    let extrairDados = dadosGet[indice];
    let modelo = extrairDados.model;
    let gola = extrairDados.neck;
    let tecido = extrairDados.material;


    if (window.confirm(`Você quer pedir essa peça?
    Características: 
        -Modelo: ${modelo}
        -Gola: ${gola}
        -Tecido: ${tecido}`)) {

        let objeto = {
            model: modelo,
            neck: gola,
            material: tecido,
            image: extrairDados.image,
            owner: nome,
            author: nome
        };

        let promessa = axios.post(API, objeto);
        promessa.then(alertaConfirmacao);
        promessa.catch(alertaErro);
    }
}

function loopTeste(valor) {
    for (i=0; i<dadosGet.length; i++) {
        if (dadosGet[i].id === valor) {
            return valor;
        }
    }
}

function alertaConfirmacao() {
    extraiAPI();
    alert("Encomenda confirmada!");
}

function alertaErro() {
    alert("Opa, não conseguimos processar sua encomenda!");
}

function extraiAPI() {
    promessaRequisitaRecentes = axios.get(API);
    promessaRequisitaRecentes.then(salvarDados);
}

function salvarDados(dados) {
    dadosGet = dados.data;
    mostrarRecentes();
}

function mostrarRecentes() {
    console.log(dadosGet);
    let opcoes = document.querySelector(".barra-bottom .opcoes");
    opcoes.innerHTML = "";
    let tamanho = Number(dadosGet.length);

    for (let i = 0; i<tamanho; i++) {
        let nome = dadosGet[i].owner;
        console.log(nome);
        let imagem = dadosGet[i].image;
        opcoes.innerHTML += `
        <div class="opcao ${i}" onclick="confirmarPedidoUltimosPedidos(this)">
            <img src=${imagem} />
            <div class="criador">
                Criador: <span>${nome}</span>
            </div>
        </div>        
        `
    }
}

