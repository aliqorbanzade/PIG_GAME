let score, roundScore, activePlayer, gamePlaying, currentDiceNumber;
init();

// DOM

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    let dice = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    let diceDOM = document.querySelectorAll(".dice");

    diceDOM[0].style.display = "block";
    diceDOM[1].style.display = "block";
    diceDOM[0].src = "dice-" + dice + ".png";
    diceDOM[1].src = "dice-" + dice2 + ".png";

    if (dice === 6 && currentDiceNumber === 6) {
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent =
        scores[activePlayer];
      nextPlayer();
    } else if (dice > 1 && dice2 > 1) {
      roundScore += dice + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextPlayer();
    }
    currentDiceNumber = dice;
  }
});

//btn hold
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    let inputValue = document.querySelector("#input").value;
    if (!inputValue) {
      inputValue = 28;
    }
    scores[activePlayer] += roundScore;

    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= inputValue) {
      document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
      document.querySelector("#dice-1").style.display = "none";
      document.querySelector("#dice-2").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.toggle("winner");

      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer == 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.querySelector("#current-0").textContent = roundScore;
  document.querySelector("#current-1").textContent = roundScore;

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector("#dice-1").style.display = "none";
  document.querySelector("#dice-2").style.display = "none";
}

//btn new

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  gamePlaying = true;

  document.querySelector("#dice-1").style.display = "none";
  document.querySelector("#dice-2").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
