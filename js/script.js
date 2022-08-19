let inputNome=document.querySelector('#nick');
let intervalo=document.querySelector('#intervalo');
let botao_comecar=document.querySelector('#comecar');
let direita_card=document.querySelector('.direita');
let outputNome=document.querySelector('.nome');
let inputNumero=document.querySelector('#numero');
let botao_jogar=document.querySelector('#jogar');
let resultado=document.querySelector('#resultado');
var tentativa=document.querySelector('#tentativas');
var contTent=3;


// Essa função irá escolher um número aleatório de 1 a n.
const num_aleatorio=(n) => Math.floor(Math.random() * (n+1)) + 1;

// Essa função irá impedir que rode sem um número digitado e se for maior que o intervalo.
const num_invalido=(num, interv) => {
    if(num==' ' || num>interv || num<1){
        return true;
    }
    else {
        return false;
    }
}

// Verificação se o jogo finalizou.
function verificar_fimjg(cont, num_advinhar, interv) {
    // Se o jogador ainda tiver tentativas, chamará a função de comparação.
    if (cont != 0) {
        comparar_num(num_advinhar, interv);
        return;
    }

    // Quando o jogador não tiver mais tentativas, ao clicar no botão, resetará.
    else {
        window.location.reload();
    }
}

// Função para quando o jogador clicar no botão "começar"
const Comecar=()=>{
    let nome=inputNome;
    let num_advinhar=0;
    let interv=0;

// Verificação para não deixar que o nome fique vazio ou que seja preenchido com números.
if(nome==' '){
    alert("O nome está inválido.");
    return;
}

// Preenchimentos nos lugares corretos.
tentativa.innerHTML=`Você ainda tem ${contTent} tentativas.`;
outputNome.innerHTML=`Oi<b>${nome}</b>, vamos jogar!<br> De acordo com a opção de intervalo que você escolheu, descubra o número.`;

// Identificando qual o intervalo e gerando o número de advinhação.
switch (intervalo.value){
    case '2':
        interv=100;
        num_advinhar=num_aleatorio(interv);
        break;
    case '3':
        interv=200;
        num_advinhar=num_aleatorio(interv);
        break;
    default:
        interv=10;
        num_advinhar=num_aleatorio(interv);
}

// Identificando quando clicar no botão de jogar e mostrando 
botao_jogar.addEventListener('click',()=>{verificar_fimjg(contTent, num_advinhar, interv)});
}

// Contando quantas tentativas restam.
const contador_tentativas=(cont, num)=>{
    cont--;
    console.log(cont);
    if(cont!=0){
        tentativa.innerHTML=`Você ainda tem ${cont} tentativas`;
        return cont;
    }

    else {
        resultado.innerHTML="Você não conseguiu adivinhar.";
        tentativa.innerHTML=`Você não tem mais tentativas, o número foi ${num}`;
        botao_jogar.innerHTML='Reiniciar';
        return cont;
    }
}

// Função para comparar os números escritos e aleatório.
const comparar_num=(num_advinhar, interv)=>{
    let jogadorNum=inputNumero.value;

    if(num_invalido(jogadorNum, interv)){
        return alert('Você  digitou um número inválido.');
    }

    if(jogadorNum<num_advinhar){
        resultado.innerHTML='O número digitado é menor';
    }

    else if(jogadorNum>num_advinhar){
        resultado.innerHTML='O número digitado é maior';
    }
    else {
        resultado.innerHTML='Parabéns, você conseguiu adivinhar.';
        tentativa.style.display = 'none';
        botao_jogar.innerHTML='Reiniciar';

        // Número 0 indicando que é o fim do jogo.
        contTent=0;
        return;
    }

    contTent=contador_tentativas(contTent, num_advinhar);
    return;
}

botao_comecar.addEventListener('click', Comecar);