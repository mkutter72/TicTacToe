'use strict';

var board = [ [null, null, null],
              [null, null, null],
              [null, null, null]
            ];


function clearBoard(){
  var aSquare = document.getElementById('C00');
  aSquare.textContent = '';
  aSquare = document.getElementById('C01');
  aSquare.textContent = '';
  aSquare = document.getElementById('C02');
  aSquare.textContent = '';
  aSquare = document.getElementById('C10');
  aSquare.textContent = '';
  aSquare = document.getElementById('C11');
  aSquare.textContent = '';
  aSquare = document.getElementById('C12');
  aSquare.textContent = '';
  aSquare = document.getElementById('C20');
  aSquare.textContent = '';
  aSquare = document.getElementById('C21');
  aSquare.textContent = '';
  aSquare = document.getElementById('C22');
  aSquare.textContent = '';

  for (var rowcnt = 0; rowcnt < board.length; rowcnt++)
    for (var colcnt = 0; colcnt < board[0].length; colcnt++)
      board[rowcnt][colcnt] = null;

}

function checkForWinner()
{
   var nullCnt = 0;
      // check all rows
   for (var i = 0; i < board.length; i++){
      for (var j = 0;j < board[0].length ; j++)
        if (!board[i][j])
            ++nullCnt;

      if (board[i][0] === board[i][1] && board[i][1]=== board[i][2] && board[i][0] !== null)
         return board[i][0];
   }

   // Check all columns
  for (var i = 0; i < board[0].length ; i++)
      if (board[0][i] === board[1][i] && board[1][i]=== board[2][i] && board[0][i] !== null)
         return board[0][i];

   // check diagonals
  if (board[0][0] === board[1][1] && board[1][1]=== board[2][2] && board[1][1] !== null)
        return board[1][1];

  if (board[0][2] === board[1][1] && board[1][1]=== board[2][0] && board[1][1] !== null)
        return board[1][1];

   if (nullCnt === 0)
    return "Draw";

    return false;
}

function turnOnEvents(liClickHandler){
  var aSquare = document.getElementById('C00');
aSquare.addEventListener('click', liClickHandler);

var aSquare = document.getElementById('C01');
aSquare.addEventListener('click', liClickHandler);

var aSquare = document.getElementById('C02');
aSquare.addEventListener('click', liClickHandler);

var aSquare = document.getElementById('C10');
aSquare.addEventListener('click', liClickHandler);

var aSquare = document.getElementById('C11');
aSquare.addEventListener('click', liClickHandler);

var aSquare = document.getElementById('C12');
aSquare.addEventListener('click', liClickHandler);

var aSquare = document.getElementById('C20');
aSquare.addEventListener('click', liClickHandler);

var aSquare = document.getElementById('C21');
aSquare.addEventListener('click', liClickHandler);

var aSquare = document.getElementById('C22');
aSquare.addEventListener('click', liClickHandler);
}

function turnOffEvents(liClickHandler)
{
   var aSquare = document.getElementById('C00');
aSquare.removeEventListener('click', liClickHandler);

var aSquare = document.getElementById('C01');
aSquare.removeEventListener('click', liClickHandler);

var aSquare = document.getElementById('C02');
aSquare.removeEventListener('click', liClickHandler);

var aSquare = document.getElementById('C10');
aSquare.removeEventListener('click', liClickHandler);

var aSquare = document.getElementById('C11');
aSquare.removeEventListener('click', liClickHandler);

var aSquare = document.getElementById('C12');
aSquare.removeEventListener('click', liClickHandler);

var aSquare = document.getElementById('C20');
aSquare.removeEventListener('click', liClickHandler);

var aSquare = document.getElementById('C21');
aSquare.removeEventListener('click', liClickHandler);

var aSquare = document.getElementById('C22');
aSquare.removeEventListener('click', liClickHandler);
}

var init = function init() {

var player = 'O';

var liClickHandler = function liClick(event) {
    event.target.textContent = ' ' + player;

  var idStr = event.currentTarget.id;
  var aSquare = document.getElementById(idStr);
  aSquare.removeEventListener('click', liClickHandler);

  var row = parseInt(idStr[1]);
  var col = parseInt(idStr[2]);
  board [row][col] = player;

  var winner = checkForWinner();
  if (winner){
    alert("We have a winner!" + winner);
    turnOffEvents(liClickHandler);
  }


  if (player === 'O')
      player = 'X';
    else
      player = 'O';
  };



function newGameClick(event) {
  clearBoard();
  turnOffEvents(liClickHandler);
  turnOnEvents(liClickHandler);
  var newGameButton = document.getElementById('newG');
  newGameButton.blur();

}


   var newGameButton = document.getElementById('newG');
    newGameButton.addEventListener('click', newGameClick);


turnOnEvents(liClickHandler);


};

init();
