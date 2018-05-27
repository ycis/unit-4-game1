

var score2hit = 0;
var userScore = 0;
var winCnt = 0;
var lossesCnt = 0;
var crystalIndex = ["ruby","diamond","purple","sapphire"];
var crystalValArr = [0,0,0,0];

var targetDiv = $("#target-score");
var userDiv = $("#player-score");
var statusDiv = $("#game-status-text");

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }

function isValueListed(crystalVal) {
    for (var i = 0; i < 4; i++) {
        if (crystalVal == crystalValArr[i]) {
            return true;
        }
    }
    return false;
}

function GetCrystalValue(crystalIDNum) {
    do {
        var number2return = getRandomIntInclusive(1,12);
    }
    while (isValueListed(number2return) == true)
    // console.log("ID Value Num: " + crystalIDNum + " = " + number2return);
    return number2return;
}

function resetGame(playerWon, initCall) {
    if (initCall == false) {
        var statusStr = "You "
        if (playerWon == true) {
            winCnt++;
            statusStr = statusStr + " Won!!<br>";
        } else {
            lossesCnt++;
            statusStr = statusStr + " Lost!!<br>";
        }
        statusDiv.html(statusStr + "Wins: " + winCnt + "<br>Losses: " + lossesCnt);
    }

    userScore = 0;
    score2hit = getRandomIntInclusive(19,120);

    targetDiv.text(score2hit);
    for (var i = 0; i < 4; i++) {
        crystalValArr[i] = GetCrystalValue(i);
    }
    updateValues(0);
}

function updateValues(clickedCrystalID) {
    var stoneVal = 0;
    for (var i = 0; i < 4; i++) {
        if (clickedCrystalID == crystalIndex[i]) {
            stoneVal = crystalValArr[i];
        }
    }
    var newVal = userScore + stoneVal;

    if (newVal < score2hit) {
        userScore = newVal;
    } else {
        resetGame(score2hit == newVal, false);
    }
    userDiv.html(userScore);
}


$(document).ready(function() {
    resetGame(false, true);
    $("#main-container").on("click", ".crystal", function () {
        updateValues($(this).attr("id"));
    });
});

  