// You are working on a logic game made up of a series of puzzles. The first type of puzzle you settle on is "sub-Sudoku", a game where the player has to position the numbers 1..N on an NxN matrix.

// Your job is to write a function that, given an NxN matrix, returns true if  every row and column contains the numbers 1..N

// The UI for the game does not do any validation on the numbers the player enters, so the matrix can contain any signed integer.

// Examples:

// [[1, 2, 3],
//  [3, 1, 2],
//  [2, 3, 1]]        -> True

// [[1, 2, 3],
//  [1, 2, 3],
//  [1, 2, 3]]        -> False

// [[1, 1, 1],
//  [2, 2, 2],
//  [3, 3, 3]]        -> False

// [[1000, -1000, 6],
//  [   2,     3, 1],
//  [   3,     1, 2]] -> False

// [[0]]              -> False

// [[3, 2, 3, 2],
//  [2, 3, 2, 3],
//  [3, 2, 3, 2],
//  [2, 3, 2, 3]]     -> False

// [[2, 3, 4],
//  [3, 4, 2],
//  [4, 2, 3]]        -> False

// [[-1,-2,-3],
//  [-2,-3,-1], 
//  [-3,-1,-2]]       -> False

// [[1,1,1],
//  [1,1,2],
//  [1,2,3]]          -> False

// [[1]]              -> True

// All Test Cases:
// validateSudoku(grid1) => True
// validateSudoku(grid2) => False
// validateSudoku(grid3) => False
// validateSudoku(grid4) => False
// validateSudoku(grid5) => False
// validateSudoku(grid6) => False
// validateSudoku(grid7) => False
// validateSudoku(grid8) => False
// validateSudoku(grid9) => False
// validateSudoku(grid10) => True

// n: The number of rows/columns in the matrix

// True
const grid1 = [
	[1,2,3],
	[3,1,2],
	[2,3,1]
];
// False
const grid2 = [
	[1,2,3],
	[1,2,3],
	[1,2,3]
];
// False
const grid3 = [
	[1,1,1],
	[2,2,2],
	[3,3,3]
];
// False
const grid4 = [
	[1000,-1000,6],
	[2,3,1],
	[3,1,2]
];
// False
const grid5 = [[0]];
// False
const grid6 = [
	[3, 2, 3, 2],
	[2, 3, 2, 3],
	[3, 2, 3, 2],
	[2, 3, 2, 3]
];
// False
const grid7 = [
	[2,3,4],
	[3,4,2],
	[4,2,3]
];
// False
const grid8 = [
	[-1,-2,-3],
	[-2,-3,-1],
	[-3,-1,-2]
];
// False
const grid9 = [
       [1,1,1],
       [1,1,2],
       [1,2,3]
];
// True
const grid10 = [[1]];

const checkIfAllExists = (singleRow) => {
  const map = {}
  for(const item of singleRow){
    map[item] = 1;
  }
  
  for(let i=1;i<singleRow.length+1;i++){
    if(!map[i])return false
  }
  
  return true;
}


const validateSudoku =(grid) => {
    for(const singleRow of grid){
    if(!checkIfAllExists(singleRow))return false;
  }
  for(let i= 1;i<grid.length+1;i++){
    const col = [];
    for(let j= 1;j<grid.length+1;j++){
      col.push(grid[j-1][i-1]);
    }
    if(!checkIfAllExists(col))return false;
  }
  return true;
}

// console.log(validateSudoku(grid1))
// console.log(validateSudoku(grid2))
// console.log(validateSudoku(grid3))
// console.log(validateSudoku(grid4))
// console.log(validateSudoku(grid5))
// console.log(validateSudoku(grid6))
// console.log(validateSudoku(grid7))
// console.log(validateSudoku(grid8))
// console.log(validateSudoku(grid9))
// console.log(validateSudoku(grid10))

/*
A nonogram is a logic puzzle, similar to a crossword, in which the player is given a blank grid and has to color it according to some instructions. Specifically, each cell can be either black or white, which we will represent as 'B' for black and 'W' for white.

+------------+
| W  W  W  W |
| B  W  W  W |
| B  W  B  B |
| W  W  B  W |
| B  B  W  W |
+------------+

For each row and column, the instructions give the lengths of contiguous runs of black ('B') cells. For example, the instructions for one row of [ 2, 1 ] indicate that there must be a run of two black cells, followed later by another run of one black cell, and the rest of the row filled with white cells.

These are valid solutions: [ W, B, B, W, B ] and [ B, B, W, W, B ] and also [ B, B, W, B, W ]
This is not valid: [ W, B, W, B, B ] since the runs are not in the correct order.
This is not valid: [ W, B, B, B, W ] since the two runs of Bs are not separated by Ws.

Your job is to write a function to validate a possible solution against a set of instructions. Given a 2D matrix representing a player's solution; and instructions for each row along with additional instructions for each column; return True or False according to whether both sets of instructions match.

Example instructions #1

matrix1 = [[ W, W, W, W ],
           [ B, W, W, W ],
           [ B, W, B, B ],
           [ W, W, B, W ],
           [ B, B, W, W ]]
rows1_1    =  [], [1], [1,2], [1], [2]
columns1_1 =  [2,1], [1], [2], [1]
validateNonogram(matrix1, rows1_1, columns1_1) => True

Example solution matrix:
matrix1 ->
                                   row
                +------------+     instructions
                | W  W  W  W | <-- []
                | B  W  W  W | <-- [1]
                | B  W  B  B | <-- [1,2]
                | W  W  B  W | <-- [1]
                | B  B  W  W | <-- [2]
                +------------+
                  ^  ^  ^  ^
                  |  |  |  |
  column       [2,1] | [2] |
  instructions      [1]   [1]
       

Example instructions #2

(same matrix as above)
rows1_2    =  [], [], [1], [1], [1,1]
columns1_2 =  [2], [1], [2], [1]
validateNonogram(matrix1, rows1_2, columns1_2) => False

The second and third rows and the first column do not match their respective instructions.

Example instructions #3

(same matrix as above)
rows1_3    = [], [1], [3], [1], [2]
columns1_3 = [3], [1], [2], [1]
validateNonogram(matrix1, rows1_3, columns1_3) => False

The third row and the first column do not match their respective instructions.

Example instructions #4

(same matrix as above)
rows1_4    =  [], [1,1], [1,2], [1], [2]
columns1_4 =  [2,1], [1], [2], [1]
validateNonogram(matrix1, rows1_4, columns1_4) => False

The second row does not match the respective instructions

Example instructions #5

matrix2 = [
 [ W, W ],
 [ B, B ],
 [ B, B ],
 [ W, B ]
]
rows2_1    = [], [2], [2], [1]
columns2_1 = [1, 1], [3]
validateNonogram(matrix2, rows2_1, columns2_1) => False

The black cells in the first column are not separated by white cells.

Example instructions #6

(same matrix as above)
rows2_2    = [], [2], [2], [1]
columns2_2 = [3], [3]
validateNonogram(matrix2, rows2_2, columns2_2) => False

The first column has the wrong number of black cells.

Example instructions #7

(same matrix as above)
rows2_3    = [], [], [], []
columns2_3 = [], []
validateNonogram(matrix2, rows2_3, columns2_3) => False

All of the instructions are empty

All Test Cases:
validateNonogram(matrix1, rows1_1, columns1_1) => True
validateNonogram(matrix1, rows1_2, columns1_2) => False
validateNonogram(matrix1, rows1_3, columns1_3) => False
validateNonogram(matrix1, rows1_4, columns1_4) => False
validateNonogram(matrix2, rows2_1, columns2_1) => False
validateNonogram(matrix2, rows2_2, columns2_2) => False
validateNonogram(matrix2, rows2_3, columns2_3) => False

n: number of rows in the matrix
m: number of columns in the matrix
*/

const matrix1 = [
	['W','W','W','W'],
	['B','W','W','W'],
	['B','W','B','B'],
	['W','W','B','W'],
	['B','B','W','W']
];
const rows1_1 = [[],[1],[1,2],[1],[2]];
const columns1_1 = [[2,1],[1],[2],[1]];

const rows1_2 = [[],[],[1],[1],[1,1]];
const columns1_2 = [[2],[1],[2],[1]];

const rows1_3 = [[],[1],[3],[1],[2]];
const columns1_3 = [[3],[1],[2],[1]];

const rows1_4 = [[],[1,1],[1,2],[1],[2]];
const columns1_4 = [[2,1],[1],[2],[1]];

const matrix2 = [
	['W','W'],
	['B','B'],
	['B','B'],
	['W','B']
];

const rows2_1 = [[],[2],[2],[1]];
const columns2_1 = [[1,1],[3]];

const rows2_2 = [[],[2],[2],[1]];
const columns2_2 = [[3],[3]];

const rows2_3 = [[],[],[],[]];
const columns2_3 = [[],[]];

// create the row and column
// for roes. generate the curent configuration with a helper function.
// that function will maintain an array and a running count
// the count will reset if we encounter a w or we are at the end.


const generateConfig = (singleRow) => {
  
  const configArr = [];
  let count = 0;
  
  for(const singleChar of singleRow){
    if(singleChar === 'B') count++;
    else if(count !== 0) {
      configArr.push(count);
      count = 0;
    }
  }
  if(count) configArr.push(count)
  
  return configArr;
}


const compareConfigs = (desiredConfig , currentConfig) => {
  if(desiredConfig.length !== currentConfig.length) return false;

  for(let i=0;i<desiredConfig.length;i++){
    if(desiredConfig[i] !== currentConfig[i]) return false;
  }
  
  return true;
}


const validateNonogram =(grid, rows, columns) => {
  
  
  let rowCount = 0;
  for(const singleRow of grid){
    const currentConfig = generateConfig(singleRow);
    const desiredConfig = rows[rowCount]
    if(!compareConfigs(desiredConfig , currentConfig)) return false;
    rowCount++;
  }
  
  
  let columnCount = 0;
  for(let i= 1;i<grid[0].length+1;i++){
    const singleColumn = [];
    for(let j= 1;j<grid.length+1;j++){
      singleColumn.push(grid[j-1][i-1]);
    }
    const currentConfig = generateConfig(singleColumn);
    const desiredConfig = columns[columnCount]
    if(!compareConfigs(desiredConfig , currentConfig)) return false;
    columnCount++;
  }
  
  return true;
}



// console.log(validateNonogram(matrix1, rows1_1, columns1_1))
// console.log(validateNonogram(matrix1, rows1_2, columns1_2))
// console.log(validateNonogram(matrix1, rows1_3, columns1_3))
// console.log(validateNonogram(matrix1, rows1_4, columns1_4))
// console.log(validateNonogram(matrix2, rows2_1, columns2_1))
// console.log(validateNonogram(matrix2, rows2_2, columns2_2))
// console.log(validateNonogram(matrix2, rows2_3, columns2_3)) 



/*
Suppose you have a one-dimensional board of two colors of tiles. Red tiles can only move to the right, black tiles can only move to the left. A tile can move 1 space at a time. Either they move to an adjacent empty space, or they can jump over a single tile of the other color to an empty space.

Eg:
red = R
black = B
empty = _

R _ B _ => _ R B _ or
         R B _ _

R B _ _ => _ B R _
                  
Given a start and end configuration represented as a list of strings, return a list of valid moves to get from start to end (doesn't need to be shortest), or None if none exist. Include the start and end states in the list of moves.

Example #1:
start_1 = ['R', '_', 'B', 'B']
end_1 = ['B', '_', 'B', 'R']
-> [
  ['R', '_', 'B', 'B']
  ['_', 'R', 'B', 'B']
  ['B', 'R', '_', 'B']
  ['B', 'R', 'B', '_']
  ['B', '_', 'B', 'R']
]


Example #2:
start_2 = ['R', 'R', '_']
end_2 =   ['_', 'R', 'R']
-> [
  ['R', 'R', '_']
  ['R', '_', 'R']
  ['_', 'R', 'R']
]

All Test Cases:
validMoves(start_1, end_1)
validMoves(start_2, end_2)


n: number of spaces in the board


*/

const generateNextMove = (currentState ,position ) => {
  const nextMoves = [];
  const currentItem = currentState[position];
  if(currentItem === '_') return nextMoves;
   
  const nextPosition = currentItem === 'R' ? position+1 : position -1 ;
  if(nextPosition >= currentState.length || nextPosition<0) return nextMoves;
  
  if(currentState[nextPosition] === '_') {
    const nextConfig = [...currentState];
    const firstItem = nextConfig[position];
    nextConfig[position] = nextConfig[nextPosition];
    nextConfig[nextPosition] = firstItem;
    
    nextMoves.push(nextConfig);    
  }
  
  if(currentState[nextPosition] !== currentState[position]){
    const oneCellAfter = currentItem === 'R' ? position+2 : position -2 ;
    if(oneCellAfter >= currentState.length || oneCellAfter<0) return nextMoves;
    
    
     if(currentState[oneCellAfter] === '_') {
      const anotherConfig = [...currentState];
      const firstItem = anotherConfig[position];
      anotherConfig[position] = anotherConfig[oneCellAfter];
      anotherConfig[oneCellAfter] = firstItem;
      nextMoves.push(anotherConfig);    
    }
  }
  
  return nextMoves;
}

const isPossibleToMove =(currentState) => {
  let isPossible = false;
  for(let i=0;i<currentState.length;i++){
    const nextMoves = generateNextMove(currentState, i);
    if(nextMoves.length) {
      isPossible = true;
      break;
    }
  }
  return isPossible;
}

const isFinalStateFound = (currentState , endState) => {
  let isMatched = true;
  for(let i=0;i<currentState.length; i++){
    if(currentState[i] !== endState[i]){
      isMatched =false;
      break;
    }
  }
  return isMatched
}

function dfs(currentState , endState ,  currentPath) {
  

  if(isFinalStateFound(currentState , endState)) {
    return currentPath;
  };
  
  if(!isPossibleToMove(currentState)) return false;

  
  for(let i=0;i<currentState.length;i++){
    const nextMoves = generateNextMove(currentState, i);
    
    for(const nextMove of nextMoves){
      const currentStack = [...currentPath , nextMove ]
      const result = dfs(nextMove , endState , currentStack);
      if(result) return result;
    }
  }
}

const validMoves = (startPosition , endPosition) => {
  return dfs(startPosition , endPosition , [startPosition])
}

// const start_1 = ["R","_","B","B"];
// const end_1 = ["B","_","B","R"];


// console.log(dfs(start_1 , end_1 , [start_1] ))

// const start_2 = ["R", "R", "_"];
// const end_2 = ["_", "R", "R"];

// console.log(dfs(start_2 , end_2 , [start_2]))

