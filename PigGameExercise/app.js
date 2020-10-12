/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundscore, activePlayer, dice, dice2, gamePlaying, storedRoll
init();


document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying) { 
        
        //Set style opacity to 100%
        document.querySelector(".dice").style.opacity=1;
        document.querySelector(".dice2").style.opacity=1;
        
        //1. random number
        dice = getRndInteger(1,6);
        dice2 = getRndInteger(1,6);
        console.log(dice, dice2)
                
        //2. dispay the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";

        var diceDOM2 = document.querySelector('.dice2');
        diceDOM2.style.display = "block";
        diceDOM2.src = "dice-" + dice2 + ".png";
          
        //3. update the round score IF the relled number was NOT a 1
        if (dice !== 1 && dice2 !== 1){
            //Add score
            roundscore += (dice + dice2);
            document.querySelector('#current-'+ activePlayer).textContent = roundscore;
        } else {
            nextPlayer();
        }

        //4. if hit 2 times 6, global scored it set to 0
        if (storedRoll === 12){
            scores[activePlayer] = 0
            document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
            nextPlayer()
            
        } else {
        storedRoll = dice + dice2
        }
        //disable the winning score input field once game has started 
        document.getElementById("winScoreText").disabled = true;
    }
    


});

document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {
        //add current score to global score
        scores[activePlayer] += roundscore;
    
    
        //Update the UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
    
    
        //Check if player won the game
        if (scores[activePlayer] >= document.getElementById("winScoreText").value) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".dice").style.opacity=0.5;
            document.querySelector(".dice2").style.opacity=0.5;
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            gamePlaying = false;
        } else {
            nextPlayer();
        }

    }
    


    
})

function nextPlayer() {
    //Next player
    document.querySelector('#current-'+ activePlayer).textContent ="0";
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundscore = 0;
    storedRoll = 0
    
    //Toggle the active player visualization
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    //Set dice opacity to 50%
    document.querySelector(".dice").style.opacity=0.5;
    document.querySelector(".dice2").style.opacity=0.5;

    
    
}

document.querySelector(".btn-new").addEventListener("click", init);


function init() {
    
    scores = [0,0];
    roundscore = 0;
    activePlayer = 0;
    gamePlaying = true;
    

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector("#name-0").textContent = "Player 1";
    document.querySelector("#name-1").textContent = "Player 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
    document.getElementById("winScoreText").disabled = false;



}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }






//document.querySelector('#current-'+ activePlayer).textContent = dice;
//document.querySelector("#current-"+ activePlayer).innerHTML = '<em>' + dice + '</em>'

//var x = document.querySelector('#score-0').textContent;
//console.log(x);
