'use strict';


var BoardMatrix = function BoardMatrix()
{
 this.board = [ [null, null, null],
              [null, null, null],
              [null, null, null]
            ];

};


BoardMatrix.prototype.clearBoard = function clearBoard() {
  for (var rowcnt = 0; rowcnt < this.board.length; rowcnt++){
    for (var colcnt = 0; colcnt < this.board[0].length; colcnt++){
      this.board[rowcnt][colcnt] = null;
    }
  }

};

BoardMatrix.prototype.setSquare = function setSquare(row,col,value) {
  this.board[row][col]= value;
};

BoardMatrix.prototype.checkForWinner = function checkForWinner()
{
   var nullCnt = 0;

   // check all rows. While you are doing row count the number of nulls
   // if all squares are filled and there is no winner, it's a draw.
   for (var i = 0; i < this.board.length; i++){
      for (var j = 0;j < this.board[0].length ; j++) {
        if (!this.board[i][j]){
            ++nullCnt;
          }
      }


      if (this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]
            && this.board[i][0] !== null){
         return this.board[i][0];
     }
   }

   // Check all columns
  for (var i = 0; i < this.board[0].length ; i++){
      if (this.board[0][i] === this.board[1][i] && this.board[1][i]=== this.board[2][i]
        && this.board[0][i] !== null){
         return this.board[0][i];
        }
      }

   // check diagonals
  if (this.board[0][0] === this.board[1][1] && this.board[1][1]=== this.board[2][2] && this.board[1][1] !== null)
        return this.board[1][1];

  if (this.board[0][2] === this.board[1][1] && this.board[1][1]=== this.board[2][0] && this.board[1][1] !== null)
        return this.board[1][1];

   if (nullCnt === 0)
    return "Draw";

    return false;
};


var initializeGame = function () {

  var board = new BoardMatrix();

  var turnOnEvents = function turnOnEvents(liClickHandler){
    $('.boardImage > div').on('click',liClickHandler);
    }

  var turnOffEvents = function (liClickHandler) {
    $('.boardImage > div').off('click',liClickHandler);
  }

  var liClickHandler = function liClick(event) {
    event.target.textContent = gameExtras.player;
    var idStr = event.target.id;

    // Since the square has been selected,  turn the click handler off
    $('#'+idStr).off('click',liClickHandler);

    var row = parseInt(idStr[1]);
    var col = parseInt(idStr[2]);
    board.setSquare(row,col,gameExtras.player);

    gameExtras.ajaxMarkCell(event,(row*3)+col,gameExtras.player);

    $('.winnerStatus').text('');

    var winner = board.checkForWinner();
    if (winner){
      if (winner === 'Draw'){
        $('.winnerStatus').text('The game is a draw');
      } else {
        $('.winnerStatus').text('Player ' + gameExtras.player  +' has won!');
      }

      turnOffEvents(liClickHandler);
      }

    if (gameExtras.singleMode){
      if (gameExtras.player === 'O')
        gameExtras.player = 'X';
      else
         gameExtras.player = 'O';
    }
  };

  var updateGameID = function () {
    $('.winnerStatus').text('GameID: ' + gameExtras.myGameID);
  };

  var newGameClick = function (event) {
    gameExtras.player = 'X'
    gameExtras.ajaxEndCurentGame(event);
    board.clearBoard();

    $('.boardImage > div').text('');

    // Turn off the click events incase any squares weren't filled in the last game
    turnOffEvents(liClickHandler);
    turnOnEvents(liClickHandler);

    // Reset the focus off the button
    $('.newGame').blur();

    gameExtras.ajaxCreateNewGame(event);

    // need to replace with a callback
    setTimeout(updateGameID, 500);

    }


  // The real actions of the init() function
  $('.newGame').on('click',newGameClick);
  $('.winnerStatus').text('Click on New Game to start');
  };


 initializeGame();

/*
function setup()
{
myExtras['initFunction'] = initializeBoard;
}

setup();
 /* cellFromOponent : function (value, index) {

  },
};*/
