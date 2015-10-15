#README for TicTacToe

##Roles for the TicTacToe Game

1. Player
1. Board
1. Square

##User Stories

###Player - as a player I want to:
-Start a new game
-Pick a square on the board to place my next move

###Board - as board I want to:
-Clear the board
-Determine if a player has won or if there is a draw
-Set a specific square with a specific playing indicator


###Square - as a square I want to:
-Display either an X or O
-Disable being changed after I have been set
-Re-enable allowing changes


##Design Choices
The board used for tracking moves will be represented by a 3x3 array

Definition of a win.   A player is considered a winner if they have any of the following combinations
of 2 consecutive squares filled with their indicator (X or O)
  -All squares in row 1 , 2 or 3
  -All squares in column 1, 2 or 3
  -All squares in either diagonal

Technologies Used
HTML for organizing the website layoff
CSS for setting the appearance of the website
Java Script for controlling the behavior of the site and representing data structures
JQuery for DOM manipulation and event handling
AJAX for communicating with the web server
JSON


NewGame Logic - either player can click
  if GameId != zero
    EndCurrent game

   Create new game - this indicates who is player X
   Display new game ID


join button logic
reads the typed in game ID
if game ID read === set gameID you are player X so just watch the game
  this indicate double player mode for player x, otherwise single player mode

if game ID read != set gameID you are player  O so join the game and then watch the game
  put up waiting message. this indicates double player mode


Initial state
gameID =0
all squares no clicks
singleMode = true


After game is over,  new game button

Switching players single game mode
There is no switching of players in double mode




