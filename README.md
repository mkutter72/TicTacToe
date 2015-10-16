#README for TicTacToe

##Roles for the TicTacToe Game

1. Player
1. Board
1. Square

##User Stories

###Player - as a player I want to:
* Start a new game
* Pick a square on the board to place my next move

###Board - as board I want to:
* Clear the board
* Determine if a player has won or if there is a draw
* Set a specific square with a specific playing indicator


###Square - as a square I want to:
* Display either an X or O
* Disable being changed after I have been set
* Re-enable allowing changes


##Design Choices
The board used for tracking moves will be represented by a 3x3 array
This board is represented by a class BoardMatrix coded with a constructor and prototype methods thereby encapsulating the board data.

Definition of a win.   A player is considered a winner if they have any of the following combinations of 2 consecutive squares filled with their indicator (X or O)
* All squares in row 1 , 2 or 3
* All squares in column 1, 2 or 3
* All squares in either diagonal

If all squares are filled and there is no winner,  a draw game is indicated


Technologies Used
* HTML for organizing the website layoff
* CSS for setting the appearance of the website
* Java Script for controlling the behavior of the site and representing data structures
* JQuery for DOM manipulation and event handling
* AJAX for communicating with the web server

##Wireframe Diagrams
![alt tag](https://raw.github.com/mkutter72/TicTacToe/gh-pages/WireFrame1.jpg)






