document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: []
};
//    {row:0, col:0, isMine:false, hidden:true},{row:0, col:1, isMine:false, hidden:true},{row:0, col:2, isMine:false, hidden:true},
//    {row:1, col:0, isMine:false, hidden:true},{row:1, col:1, isMine:false, hidden:true},{row:1, col:2, isMine:false, hidden:true},
//    {row:2, col:0, isMine:true, hidden:true},{row:2, col:1, isMine:false, hidden:true},{row:2, col:2, isMine:false, hidden:true}
var size = 3;
//var difficulty = 0;




function startGame() {
  createBoard();

  for(var i = 0; i < board.cells.length; i++){
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }

  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);

  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}


function createBoard() {
  for(var r = 0; r < size; r++){
    for(var c = 0; c < size; c++){
      var newCell = {
        row: r,
        col: c,
        isMine: false,
        isMarked: false,
        hidden: true,
        surroundingMines: 0
      }
      board.cells.push(newCell);
    }
  }
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
