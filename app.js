'use strict';

var board = [ [null, null, null],
              [null, null, null],
              [null, null, null]
            ];


var clearBoard = function (){
  $('.boardImage > div').text('');
  $('.winnerStatus').text('');

  for (var rowcnt = 0; rowcnt < board.length; rowcnt++)
    for (var colcnt = 0; colcnt < board[0].length; colcnt++)
      board[rowcnt][colcnt] = null;

}

function checkForWinner()
{
   var nullCnt = 0;

   // check all rows. While you are doing row count the number of nulls
   // if all squares are filled and there is no winner, it's a draw.
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
  $('.boardImage > div').on('click',liClickHandler);
}

function turnOffEvents(liClickHandler)
{
  $('.boardImage > div').off('click',liClickHandler);
}

var init = function init() {

  var player = 'O';

  var liClickHandler = function liClick(event) {
    event.target.textContent = player;
    var idStr = event.target.id;

    // Since the square has been selected,  turn the click handler off
    $('#'+idStr).off('click',liClickHandler);

    var row = parseInt(idStr[1]);
    var col = parseInt(idStr[2]);
    board [row][col] = player;


    gameExtras.ajaxMarkCell(event,(row*3)+col,player);

    $('.winnerStatus').text('');

    var winner = checkForWinner();
    if (winner){
      if (winner === 'Draw'){
        $('.winnerStatus').text('The game is a draw');
      } else {
        $('.winnerStatus').text('Player ' + player  +' has won!');
      }

      turnOffEvents(liClickHandler);
      }

    if (player === 'O')
      player = 'X';
    else
       player = 'O';
  };



  function newGameClick(event) {
    gameExtras.ajaxEndCurentGame(event);
    clearBoard();
    turnOffEvents(liClickHandler);
    turnOnEvents(liClickHandler);

    // Reset the focus off the button
    $('.newGame').blur();
    $('.winnerStatus').text('Player ' + player + ' goes first');
    gameExtras.ajaxCreateNewGame(event);
    }


  // The real actions of the init() function
  $('.newGame').on('click',newGameClick);
  turnOnEvents(liClickHandler);
  $('.winnerStatus').text('Player ' + player + ' goes first');

  };


init();
