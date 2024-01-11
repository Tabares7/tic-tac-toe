const winner = [
    // Horizontales
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    //Verticales
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    // Diagonales
    [1, 5, 9],
    [3, 5, 7]
]
const holes = document.querySelectorAll('.box');
const resetBtn = document.querySelector('#restart');
const scoreMarker = document.getElementById('marker'); //scoreM
const score1 = document.getElementById('player1-puntuation');
const score2 = document.getElementById('player2-puntuation');
const restar_alert = document.querySelector('#restart-alert');
const yes_btn = document.getElementById('yes');
const backdrop = document.querySelector('.backdrop');


var turn = 0;
var playerWinner = "";

let player1 = [];
let player2 = [];

var score1Count = 0;
var score2Count = 0;



const turnToggle = ()=>{
    if(turn == 0){
        turn = 1;
    }else{
        turn = 0;
    }
}

const playedCheck = (e)=>{
    if(e.target.classList.contains('player1') || e.target.classList.contains('player2')){
        return true;
    }else{
        return false;
    }
}


const reset = ()=>{
    player1 = [];
    player2 = [];
    turn = 0;
    scoreMarker.innerHTML = "";
    scoreMarker.classList.remove('marker--visible');
    playerWinner = "";
    holes.forEach((hole)=>{
        hole.classList.remove('player1');
        hole.classList.remove('player2');
    })
    restar_alert.classList.remove('restart-alert--visible');
    backdrop.classList.remove('backdrop--visible');
}

const checkDraw = ()=>{
    if(player1.length + player2.length == 9){
        scoreMarker.innerHTML = `It's a draw!!`;
        scoreMarker.classList.add('marker--visible');
    }
}

const showRestartAlert = ()=>{
    restar_alert.classList.add('restart-alert--visible');
    yes_btn.addEventListener('click', reset);
    backdrop.classList.add('backdrop--visible');
}

const checkWinner = (player)=>{
    checkDraw();
    if(player.length >= 3){ 
        winner.forEach((win)=>{
            let count = 0;
            player.forEach((p)=>{
                if(win.includes(p)){
                    count++;
                }
            })
            if(count == 3){
                if  (turn == 0){
                    playerWinner = "Red";
                    scoreMarker.innerHTML += `${playerWinner} Wins!! `;
                    scoreMarker.classList.add('marker--visible');
                    score1Count++;
                    score1.innerHTML = score1Count;
                    setTimeout(showRestartAlert, 1000);
                    return;
                    
                }else {
                    playerWinner = "Green";
                    scoreMarker.innerHTML += `${playerWinner} Wins!!`;
                    scoreMarker.classList.add('marker--visible');
                    score2Count++;
                    score2.innerHTML = score2Count;
                    setTimeout(showRestartAlert, 1000);
                    return;
                }   
        }
    })
}
checkDraw();
}


holes.forEach((hole)=>{
    hole.addEventListener('click', (e)=>{
        if(turn == 0){
            if(playedCheck(e)){
                return;
            }
            e.target.classList.add('player1');
            player1.push(parseInt(e.target.id));
            checkWinner(player1);
            turnToggle();
    }else{
        if(playedCheck(e)){
            return;
        }
        e.target.classList.add('player2');
        player2.push(parseInt(e.target.id));
        checkWinner(player2);
        turnToggle();
    }
})})



resetBtn.addEventListener('click', reset);