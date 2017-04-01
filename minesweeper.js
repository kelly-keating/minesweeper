document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!

//    {row:0, col:0, isMine:false, hidden:true},{row:0, col:1, isMine:false, hidden:true},{row:0, col:2, isMine:false, hidden:true},
//    {row:1, col:0, isMine:false, hidden:true},{row:1, col:1, isMine:false, hidden:true},{row:1, col:2, isMine:false, hidden:true},
//    {row:2, col:0, isMine:true, hidden:true},{row:2, col:1, isMine:false, hidden:true},{row:2, col:2, isMine:false, hidden:true}

var board = {};
var size = 3;
var difficulty = 2; //can be set from form




function resetVals(){
  var s = document.getElementById("initSize");
  size = s.options[s.selectedIndex].value;
  var d = document.getElementById("initDiff");
  difficulty = d.options[d.selectedIndex].value;
  startGame();
}

function startGame() {

  var temp = document.getElementsByClassName('board');
  temp[0].innerHTML = ""; // clear existing board
  board.cells = []; // re-initialise cells array

  createBoard();

  for(var i = 0; i < board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }

  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);

  // Don't remove this function call: it makes the game work!
  lib.initBoard();
}


function createBoard() {

  for(var r = 0; r < size; r++){
    for(var c = 0; c < size; c++){
      var newCell = {
        row: r,
        col: c,
        isMine: randMine(),
        isMarked: false,
        hidden: true,
        surroundingMines: 0
      }
      board.cells.push(newCell);
    }
  }

//check we have some mines, but not only mines
  var count = 0;
  for(var i = 0; i < board.cells.length; i++){
    if(board.cells[i].isMine == true){
      count++;
    }
  }
  if(count == 0 || count == board.cells.length){
    createBoard();
  }
}

function randMine(){
  return Math.random()*15 < difficulty; //the lower the difficulty, the less mines
}


// Define this function to look for a win condition:
function checkForWin () {

  for(var i = 0; i < board.cells.length; i++){
    if(board.cells[i].isMine == true){        //if mine exists not marked, board not finished
      if(board.cells[i].isMarked != true){
        return
      }
    } else if(board.cells[i].hidden == true){ //not mine and hidden = not finished
      return
    }
  }

  lib.displayMessage('You win!')
  return
}

// Define this function to count the number of mines around the cell
// It will return cell objects in an array.
function countSurroundingMines (cell) {
  var count = 0;
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
  for (var i = 0; i < surroundingCells.length; i++) {
    if (surroundingCells[i].isMine == true) {
      count++;
    }
  }
  return count;
}
