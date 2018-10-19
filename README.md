# Star Wars RPG
## Overview 
Star Wars RPG is a simple Role Playing Game that demonstrates and practices the use of Vanilla JavaScript, combined with BootStrap Grid/Flex organization and JQuery DOM manipulation. It is a simple game flow, and is not intended for more than demonstrative purposes :) 
## Rules of the Game 
### Get ready to Play!
1. Select a character you want to play. The application uses alerts to let the user know what's the next action expected of them (Call To Action). 
2. Next, select your choice of opponent. This will be your first opponent. There will be more, assuming you chose wisely! 
### Play! 
1. Simply press the attack button. 
2. The progress bars will reflect your attack on the opponent. 
  a. Your opponent will immediately counter-attack 
  b. Your attack power will increase after each counter-attack (assuming you aren't defeated!) by the original amount of attack power you had. 
3. This continues until someone prevails. 
4. If there's more opponents, you'll choose who's next and fight them! 
5. You can reset the game if you fail. 
## Code Overview
This program uses a JavaScript Object called rpgGame that stores primary data and methods for playing the game. 
A few functions are contained within the Window Object for grabbing DOM elements for easier maniuplation. 

The game has a total of 6 event listeners, all onClick events for the 4 character cards for player/opponent selection, reset and Attack functionality. 

      

              
