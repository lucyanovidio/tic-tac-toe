// ====== Variáveis ======

const screen1 = document.querySelector(".screen1");
const screen2 = document.querySelector(".screen2");
const playBtn = document.querySelector(".content1 button");
const explanatoryText = document.querySelector(".content1 p");
const selectionContainer = document.querySelector(".content2");
const stopGameBtn = document.querySelector(".screen2 button");
const modal = document.querySelector("dialog");
const currentPlayerText = document.querySelector(".screen2 h2");

const fields = document.querySelectorAll(".field");
const oElements = document.querySelectorAll(".feather-circle");
const xElements = document.querySelectorAll(".feather-x");

const selectOBtn = document.querySelector(".selection button:nth-child(1)");
const selectXBtn = document.querySelector(".selection button:nth-child(2)");

let xIsSelected;
let player1_Option;
let player2_Option;
let currentPlayer = 1;
let currentPlayerSymbol;
let winnerSymbol = 0;

// ====== Eventos ======

//Realizando animação para opções de símbolo
playBtn.addEventListener("click", () => {
    screen1.classList.add("selection-appear");
    setTimeout(() => {
        selectionContainer.classList.remove("hide");
        explanatoryText.classList.toggle("hide");
    }, 800)
});

// Seleção de O
selectOBtn.addEventListener("click", () => {
    if (selectXBtn.classList.length != 0) {
        alert("Botão de 'X' está selecionado. Desselecione primeiro.");
        return;
    }
    if (selectOBtn.classList.length != 0) {
        selectOBtn.classList.toggle("selected");
        return;
    }
    
    selectOBtn.classList.toggle("selected");
    xIsSelected = false;

    setTimeout(selectionMade, 600);
});

// Seleção de X
selectXBtn.addEventListener("click", () => {
    if (selectOBtn.classList.length != 0) {
        alert("Botão de 'O' está selecionado. Desselecione primeiro.");
        return;
    }
    if (selectXBtn.classList.length != 0) {
        selectXBtn.classList.toggle("selected");
        return;
    }

    selectXBtn.classList.toggle("selected");
    xIsSelected = true;

    setTimeout(selectionMade, 600);
});

// Funcionalidade de click nos campos do jogo da velha
fields.forEach(field => {
    field.onclick = () => fieldClick(field);
});

// Botão para interromper partida
stopGameBtn.addEventListener("click", stopGame);

// ====== Funções ======

function fieldClick(element) {
    // Pra pessoa não selecionar o mesmo campo que ela ou q o outro player já selecionou 
    if (element.classList.length < 2) {
        if (xIsSelected === true) {
            element.classList.toggle("x-position-selected");
            xIsSelected = false;
            play();
        } else {
            element.classList.toggle("o-position-selected");
            xIsSelected = true;
            play();
        }
    } else {
        alert("Esse campo já foi selecionado.");
        return;
    }
}

// Função para ir para jogo depois da seleção do símbolo
function selectionMade() {
    if (xIsSelected === true) {
        player1_Option = "X";
        player2_Option = "O";
    } else {
        player1_Option = "O";
        player2_Option = "X";
    }

    modal.innerHTML = `
        <h2>Vamos nessa?</h2>
        <p>Player 1: <span>${player1_Option}</span></p>
        <p>Player 2: <span>${player2_Option}</span></p>
        <div class="selection">
            <button>Vamos</button>
            <button>Voltar</button>
        </div>
    `;
    modal.showModal();

    let goBtn = document.querySelector("dialog button:nth-child(1)");
    let backBtn = document.querySelector("dialog button:nth-child(2)");

    goBtn.addEventListener("click", () => {
        currentPlayerSymbol = player1_Option;

        toggleScreen(2000);
        play();
        modal.close();
    });
    backBtn.addEventListener("click", () => {
        modal.close();
        return
    });
}

// Troca de telas
function toggleScreen(time) {
    screen1.classList.toggle("play");
    screen2.classList.toggle("play");
    
    setTimeout(() => {
        screen1.classList.toggle("hide");
        screen2.classList.toggle("hide");
    }, time);
}

// Função onde verificamos vencedor, empate e mostramos na tela
function play() {
    let oSelectedFields = [];
    let xSelectedFields = [];

    let isGameOver = 0;
    for (let i = 0; i < fields.length; i++) {
        if (fields[i].classList.length > 1) {
            isGameOver++;
        }
        if (fields[i].classList.contains("o-position-selected")) {
            oSelectedFields.push(i);
        } else if (fields[i].classList.contains("x-position-selected")) {
            xSelectedFields.push(i);
        }
    }

    verifyO(oSelectedFields);
    verifyX(xSelectedFields);

    if (winnerSymbol != 0) {
        setTimeout(() => {
            gameOver(winnerSymbol);
        }, 2500);
        return;
    }

    // Caso empate
    if (isGameOver === fields.length) {
        setTimeout(gameTie, 300);
        return;
    }

    // Mostrando a vez do jogador da vez
    currentPlayerText.innerHTML = `
        Player ${currentPlayer}: <span>${currentPlayerSymbol}</span>
    `;
    if (currentPlayer === 1) {
        currentPlayerSymbol = player2_Option;
        currentPlayer = 2;
    } else {
        currentPlayerSymbol = player1_Option;
        currentPlayer = 1;
    }
}

// Verificando se os fields marcados com O contém uma das 8 sequências de números da vitória a cada jogada
function verifyO(arrayO) {
    if (arrayO.includes(0) && arrayO.includes(1) && arrayO.includes(2)) {
        setTimeout(() => {
            fillVictoryFields(0, 1, 2);
        }, 150);
        winnerSymbol = 'O';
    } else if (arrayO.includes(3) && arrayO.includes(4) && arrayO.includes(5)) {
        setTimeout(() => {
            fillVictoryFields(3, 4, 5);
        }, 150);
        winnerSymbol = 'O';
    } else if (arrayO.includes(6) && arrayO.includes(7) && arrayO.includes(8)) {
        setTimeout(() => {
            fillVictoryFields(6, 7, 8);
        }, 150);
        winnerSymbol = 'O';
    } else if (arrayO.includes(0) && arrayO.includes(3) && arrayO.includes(6)) {
        setTimeout(() => {
            fillVictoryFields(0, 3, 6);
        }, 150);
        winnerSymbol = 'O';
    } else if (arrayO.includes(1) && arrayO.includes(4) && arrayO.includes(7)) {
        setTimeout(() => {
            fillVictoryFields(1, 4, 7);
        }, 150);
        winnerSymbol = 'O';
    } else if (arrayO.includes(2) && arrayO.includes(5) && arrayO.includes(8)) {
        setTimeout(() => {
            fillVictoryFields(2, 5, 8);
        }, 150);
        winnerSymbol = 'O';
    } else if (arrayO.includes(0) && arrayO.includes(4) && arrayO.includes(8)) {
        setTimeout(() => {
            fillVictoryFields(0, 4, 8);
        }, 150);
        winnerSymbol = 'O';
    } else if (arrayO.includes(2) && arrayO.includes(4) && arrayO.includes(6)) {
        setTimeout(() => {
            fillVictoryFields(2, 4, 6);
        }, 150);
        winnerSymbol = 'O';
    }
}

// Verificando se os fields marcados com X contém uma das 8 sequências de números da vitória a cada jogada
function verifyX(arrayX) {
    if (arrayX.includes(0) && arrayX.includes(1) && arrayX.includes(2)) {
        setTimeout(() => {
            fillVictoryFields(0, 1, 2);
        }, 150);
        winnerSymbol = 'X';
    } else if (arrayX.includes(3) && arrayX.includes(4) && arrayX.includes(5)) {
        setTimeout(() => {
            fillVictoryFields(3, 4, 5);
        }, 150);
        winnerSymbol = 'X';
    } else if (arrayX.includes(6) && arrayX.includes(7) && arrayX.includes(8)) {
        setTimeout(() => {
            fillVictoryFields(6, 7, 8);
        }, 150);
        winnerSymbol = 'X';
    } else if (arrayX.includes(0) && arrayX.includes(3) && arrayX.includes(6)) {
        setTimeout(() => {
            fillVictoryFields(0, 3, 6);
        }, 150);
        winnerSymbol = 'X';
    } else if (arrayX.includes(1) && arrayX.includes(4) && arrayX.includes(7)) {
        setTimeout(() => {
            fillVictoryFields(1, 4, 7);
        }, 150);
        winnerSymbol = 'X';
    } else if (arrayX.includes(2) && arrayX.includes(5) && arrayX.includes(8)) {
        setTimeout(() => {
            fillVictoryFields(2, 5, 8);
        }, 150);
        winnerSymbol = 'X';
    } else if (arrayX.includes(0) && arrayX.includes(4) && arrayX.includes(8)) {
        setTimeout(() => {
            fillVictoryFields(0, 4, 8);
        }, 150);
        winnerSymbol = 'X';
    } else if (arrayX.includes(2) && arrayX.includes(4) && arrayX.includes(6)) {
        setTimeout(() => {
            fillVictoryFields(2, 4, 6);
        }, 150);
        winnerSymbol = 'X';
    }
}

// Função para adicionar classe que preenche o field de verde quando o player vence
function fillVictoryFields(fieldNum_1, fieldNum_2, fieldNum_3) {
    fields[fieldNum_1].classList.add("victory-field");
    fields[fieldNum_2].classList.add("victory-field");
    fields[fieldNum_3].classList.add("victory-field");
}

// Função para empate, opções: tentar de novo ou ir para o início
function gameTie() {
    modal.innerHTML = `
        <h2>Empate!</h2>
        <p>Houve um empate. Tente novamente.</p>
        <div class="selection">
            <button>Jogar novamente</button>
            <button>Voltar para início</button>
        </div>
    `;
    const playAgainBtn = document.querySelector("dialog button:nth-child(1)");
    const backToStartBtn = document.querySelector("dialog button:nth-child(2)");
    
    playAgainBtn.addEventListener("click", playAgain);
    backToStartBtn.addEventListener("click", backToStart);

    modal.showModal();
}

// Função para fluxo normal onde temos um vencedor, onde mostramos ele e damos opção de voltar ou jogar de novo
function gameOver(winnerSymbol) {
    let winner;

    if (winnerSymbol === player1_Option) {
        winner = 1;
    } else if (winnerSymbol === player2_Option) {
        winner = 2;
    }

    modal.innerHTML = `
        <p>Vencedor:</p>
        <h2><span>Player ${winner}</span></h2>
        <div class="selection">
            <button>Jogar novamente</button>
            <button>Voltar para início</button>
        </div>
    `;

    const playAgainBtn = document.querySelector("dialog button:nth-child(1)");
    const backToStartBtn = document.querySelector("dialog button:nth-child(2)");

    playAgainBtn.addEventListener("click", playAgain);
    backToStartBtn.addEventListener("click", backToStart);
    
    modal.showModal();
}

// Resetando o jogo e fechando o modal pra outra partida
function playAgain() {
    resetGame();
    modal.close();
}

// Resetando o jogo, fechando o modal e trocando para tela para tela inicial (sem delay)
function backToStart() {
    resetGame();
    modal.close();
    toggleScreen(0);
}

// Resetando e limpando o que foi feito
function resetGame() {
    fields.forEach(field => {
        // Campos marcados no jogo em si
        field.classList.remove("x-position-selected");
        field.classList.remove("o-position-selected");
        field.classList.remove("victory-field");
        // Texto tela inicial e container
        explanatoryText.classList.remove("hide");
        selectionContainer.classList.add("hide");
        screen1.classList.remove("selection-appear");
        // Marcador usado para verificar campeão
        winnerSymbol = 0;
        // Removendo seleção de símbolo nos botões
        if (selectXBtn.classList.length > 0) {
            selectXBtn.classList.remove("selected");
        }
        if (selectOBtn.classList.length > 0) {
            selectOBtn.classList.remove("selected");
        }
        if (xIsSelected === true) {
            xIsSelected = false;
        } else if (xIsSelected === false) {
            xIsSelected = true;
        }
    });
}

// Função para interromper partida
function stopGame() {
    modal.innerHTML = `
        <h2>Tem certeza que quer parar?</h2>
        <p>Você será redirecionado para o início.</p>
        <div class="selection">
            <button>Sim</button>
            <button>Não</button>
        </div>
    `;

    const yesBtn = document.querySelector("dialog button:nth-child(1)");
    const noBtn = document.querySelector("dialog button:nth-child(2)");

    yesBtn.addEventListener("click", backToStart);
    noBtn.addEventListener("click", () => {
        modal.close();
    });

    modal.showModal();
}

// Lib de ícones
feather.replace();