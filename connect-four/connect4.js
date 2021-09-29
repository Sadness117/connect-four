/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;
let gameOver = false;
const htmlBoard = document.getElementById('board')
let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])
let moves = WIDTH*HEIGHT; // this will end up count down the remaining moves
/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
//this makes the data board where the player information is stored.
function makeBoard() {
  for (let i = 0;i< HEIGHT;i++){
    //this makes the row
    let rowCells = [];

    //this makes each cell in the row
    for (let j = 0; j<WIDTH; j++){
      
      rowCells.push(0);
    }

    board.push(rowCells)
  }
  console.log(board)
  
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
}
//this changes the current player
function changePlayer(){
  if (currPlayer === 1){
    currPlayer = 2;
  }
  else{
    currPlayer =1;
  }
}



/** makeHtmlBoard: make HTML table and row of column tops. */


//this function creates the tables and cells for the game
function makeHtmlBoard() {

  
  var top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (var x = 0; x < WIDTH; x++) {
    
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}





//this makes the y value start form bottom to top
const trueY = function(x,y){

  for (let i = board.length-1; i>=0; i--){
    if(board[i][x] === 0){
      return y = i;
      
    }
  }
  if (board[x][y] !== 0){
return -1;
  }
}



function placeInTable(y, x) {
let className = ''
  if (currPlayer ===1){
className = 'player1'
}else{
className = 'player2'
}
//line 107 was used to get a more realistic y value for the game
y = trueY(x,y)


let cellId = `${y}-${x}`;
  if(y !== -1&& gameOver === false){
  
//the foloowing if statements are used to check if the cell has already been assinged
    if(board[y][x] === 0){
      let newDiv = document.createElement('div');
      newDiv.className = className;
      //line 118 was used so the circle css would pop up
      newDiv.innerText= 'O';
    let currentCell = document.getElementById(cellId)
    
      currentCell.append(newDiv)
      board[y][x] = currPlayer;
      console.log(board);

      moves--;
      console.log(moves);
      // changePlayer();

    }
    
  }
  
  
}

/** endGame: announce game end */

function endGame(msg) {
  setTimeout(function(){alert(msg)}, 1)
  
  
}



// function findSpotForCol(x) {
  
//   return 0;
// }

function handleClick(evt) {
  
  // get x from ID of clicked cell
  var x = +evt.target.id;

  
  var y = 0;
  

  // place piece in board and add to HTML table
  
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }



 
  // switch players

  changePlayer();
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  if (moves === 0){
    gameOver = true;
    endGame('Out of moves! Tied!')
  }
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // below is the key for the win conditions

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        gameOver = true;
        return true;
      }
    }
  }
}
//this sets up the html for the game
makeBoard();
makeHtmlBoard();



