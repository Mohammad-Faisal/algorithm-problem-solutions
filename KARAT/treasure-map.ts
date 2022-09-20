"use strict";

/*
We are designing a 2D game and we have a game map that we represent by an integer matrix. For now, each cell can be a wall (denoted by -1) or a blank space (0).

board = [
  [0,  0,  0, -1, -1],
  [0,  0, -1,  0,  0],
  [0, -1,  0, -1,  0],
  [0,  0, -1,  0,  0],
  [0,  0,  0,  0,  0],
  [0,  0,  0,  0,  0],
  [0,  0,  0,  0,  0],
]

The player can move 1 space at a time up, down, left, or right. The player can't go through walls or land on a wall, or go through the edges of the board.

Write a function that, given a board and a player starting position (represented as a row-column pair), returns all of the possible next positions for the player.

Sample inputs (board, starting_position) and outputs (in any order):

findLegalMoves(board, (1, 1)) =>
  (0, 1), (1, 0)

findLegalMoves(board, (5, 3)) =>
  (5, 2), (5, 4), (4, 3), (6, 3)

findLegalMoves(board, (5, 1)) =>
  (6, 1), (4, 1), (5, 0), (5, 2)

findLegalMoves(board, (6, 0)) =>
  (5, 0), (6, 1)

findLegalMoves(board, (6, 4)) =>
  (5, 4), (6, 3)

findLegalMoves(board, (0, 0)) =>
  (0, 1), (1, 0)

findLegalMoves(board, (2, 2)) =>
  [empty]

n: width of the input board
m: height of the input board
*/

var board = [
  [0, 0, 0, -1, -1],
  [0, 0, -1, 0, 0],
  [0, -1, 0, -1, 0],
  [0, 0, -1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

// var start1 = [1, 1];
// var start2 = [5, 3];
// var start3 = [5, 1];
// var start4 = [6, 0];
// var start5 = [6, 4];
// var start6 = [0, 0];
// var start7 = [2, 2];

// const findLegalMoves = (board , position) => {
//   const moves = [ [1 , 0] , [ 0 , 1] , [ -1 , 0] , [0 , -1] ];

//   const answer = []
//   for(const singleMove of moves){
//     const nextX = position[0] + singleMove[0];
//     const nextY = position[1] + singleMove[1];

//     if(nextX> -1 && nextX < board.length && nextY > -1 && nextY < board[0].length){
//       if(board[nextX][nextY] === 0 ){
//         answer.push([nextX, nextY])
//       }
//     }
//   }
//   return answer;
// }

/*
Given a board and an end position for the player, write a function to determine if it is possible to travel from every open cell on the board to the given end position.

board1 = [
    [ 0,  0,  0, 0, -1 ],
    [ 0, -1, -1, 0,  0 ],
    [ 0,  0,  0, 0,  0 ],
    [ 0, -1,  0, 0,  0 ],
    [ 0,  0,  0, 0,  0 ],
    [ 0,  0,  0, 0,  0 ],
]

board2 = [
    [  0,  0,  0, 0, -1 ],
    [  0, -1, -1, 0,  0 ],
    [  0,  0,  0, 0,  0 ],
    [ -1, -1,  0, 0,  0 ],
    [  0, -1,  0, 0,  0 ],
    [  0, -1,  0, 0,  0 ],
]

board3 = [
    [ 0,  0,  0,  0,  0,  0, 0 ],
    [ 0, -1, -1, -1, -1, -1, 0 ],
    [ 0, -1,  0,  0,  0, -1, 0 ],
    [ 0, -1,  0,  0,  0, -1, 0 ],
    [ 0, -1,  0,  0,  0, -1, 0 ],
    [ 0, -1, -1, -1, -1, -1, 0 ],
    [ 0,  0,  0,  0,  0,  0, 0 ],
]

board4 = [
    [0,  0,  0,  0, 0],
    [0, -1, -1, -1, 0],
    [0, -1, -1, -1, 0],
    [0, -1, -1, -1, 0],
    [0,  0,  0,  0, 0],
]

board5 = [
    [0],
]

end1 = (0, 0)
end2 = (5, 0)

Expected output:

isReachable(board1, end1) -> True
isReachable(board1, end2) -> True
isReachable(board2, end1) -> False
isReachable(board2, end2) -> False
isReachable(board3, end1) -> False
isReachable(board4, end1) -> True
isReachable(board5, end1) -> True


n: width of the input board
m: height of the input board
*/

var board1 = [
  [0, 0, 0, 0, -1],
  [0, -1, -1, 0, 0],
  [0, 0, 0, 0, 0],
  [0, -1, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

var board2 = [
  [0, 0, 0, 0, -1],
  [0, -1, -1, 0, 0],
  [0, 0, 0, 0, 0],
  [-1, -1, 0, 0, 0],
  [0, -1, 0, 0, 0],
  [0, -1, 0, 0, 0],
];

var board3 = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, -1, -1, -1, -1, -1, 0],
  [0, -1, 0, 0, 0, -1, 0],
  [0, -1, 0, 0, 0, -1, 0],
  [0, -1, 0, 0, 0, -1, 0],
  [0, -1, -1, -1, -1, -1, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

var board4 = [
  [0, 0, 0, 0, 0],
  [0, -1, -1, -1, 0],
  [0, -1, -1, -1, 0],
  [0, -1, -1, -1, 0],
  [0, 0, 0, 0, 0],
];

var board5 = [[0]];

// var end1 = [0, 0];
// var end2 = [5, 0];

const dfs = (board, x, y, vis) => {
  vis[x][y] = 1;
  const nextMoves = findLegalMoves(vis, [x, y]);
  for (const move of nextMoves) {
    dfs(board, move[0], move[1], vis);
  }
  return vis;
};

const createDuplicateArray = (input) => {
  const newArr = [];
  for (const row of input) {
    const newRow = [];
    for (const item of row) {
      newRow.push(item);
    }
    newArr.push(newRow);
  }

  return newArr;
};

const isReachable = (board, end) => {
  const newBoard = createDuplicateArray(board);
  const vis = createDuplicateArray(board);
  const result = dfs(newBoard, end[0], end[1], vis);

  for (const row of result) {
    for (const cell of row) {
      if (cell === 0) return false;
    }
  }
  return true;
};

/*
Now the board also includes treasures, denoted by 1.

Given a board and start and end positions for the player, write a function to return the shortest simple path of open spaces from start to end that includes all the treasures, if any exist. If multiple shortest paths exist, return any of them. A simple path is one that does not revisit any location.

board3_1 = [
    [  1,  0,  0, 0, 0 ],
    [  0, -1, -1, 0, 0 ],
    [  0, -1,  0, 1, 0 ],
    [ -1,  0,  0, 0, 0 ],
    [  0,  1, -1, 0, 0 ],
    [  0,  0,  0, 0, 0 ],
]

board3_2 = [
    [  0,  1, -1 ],
    [  0,  0,  0 ],
    [  0,  0,  0 ],
]

treasure(board3_1, (5, 0), (0, 4)) -> None

treasure(board3_1, (5, 2), (2, 0)) ->
  [(5, 2), (5, 1), (4, 1), (3, 1), (3, 2), (2, 2), (2, 3), (1, 3), (0, 3), (0, 2), (0, 1), (0, 0), (1, 0), (2, 0)]
  Or
  [(5, 2), (5, 1), (4, 1), (3, 1), (3, 2), (3, 3), (2, 3), (1, 3), (0, 3), (0, 2), (0, 1), (0, 0), (1, 0), (2, 0)]

treasure(board3_1, (0, 0), (4, 1)) ->
  [(0, 0), (0, 1), (0, 2), (0, 3), (1, 3), (2, 3), (2, 2), (3, 2), (3, 1), (4, 1)]
  Or
  [(0, 0), (0, 1), (0, 2), (0, 3), (1, 3), (2, 3), (3, 3), (3, 2), (3, 1), (4, 1)]

treasure(board3_2, (2, 1), (1, 2)) ->
  [(2, 1), (2, 0), (1, 0), (0, 0), (0, 1), (1, 1), (1, 2)]

n: width of the input board
m: height of the input board
*/
const board3_1 = [
  [1, 0, 0, 0, 0],
  [0, -1, -1, 0, 0],
  [0, -1, 0, 1, 0],
  [-1, 0, 0, 0, 0],
  [0, 1, -1, 0, 0],
  [0, 0, 0, 0, 0],
];

const board3_2 = [
  [0, 1, -1],
  [0, 0, 0],
  [0, 0, 0],
];

const start1 = [5, 0];
const end1 = [0, 4];

const start2 = [5, 2];
const end2 = [2, 0];

const start3 = [0, 0];
const end3 = [4, 1];

const start4 = [2, 1];
const end4 = [1, 2];

const allPaths = [];
const findLegalMoves = (board, position) => {
  const moves = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  const answer = [];
  for (const singleMove of moves) {
    const nextX = position[0] + singleMove[0];
    const nextY = position[1] + singleMove[1];

    if (
      nextX > -1 &&
      nextX < board.length &&
      nextY > -1 &&
      nextY < board[0].length
    ) {
      if (board[nextX][nextY] === 0 || board[nextX][nextY] === 1) {
        answer.push([nextX, nextY]);
      }
    }
  }
  return answer;
};

const findPathDfs = (board, curPosition, endPosition, vis, path) => {
  if (curPosition[0] === endPosition[0] && curPosition[1] === endPosition[1]) {
    allPaths.push([...path]);
    return;
  }
  vis[curPosition[0]][curPosition[1]] = -1;
  const nextMoves = findLegalMoves(vis, curPosition);
  for (const move of nextMoves) {
    path.push(move);
    findPathDfs(board, move, endPosition, vis, path);
    path.pop();
  }
  vis[curPosition[0]][curPosition[1]] = 0;
};

const findTreasure = (board, start, end) => {
  const vis = createDuplicateArray(board);
  let count = 0;
  for (const row of board) {
    for (const item of row) {
      if (item === 1) count++;
    }
  }
  vis[start[0]][start[1]] = 1;
  findPathDfs(board, start, end, vis, [start]);
  for (const path of allPaths) {
    let tempCount = 0;
    for (const position of path) {
      if (board[position[0]][position[1]] === 1) {
        tempCount++;
      }
    }

    if (count === tempCount) {
      return path;
    }
  }
  return [];
};

console.log(findTreasure(board3_2, start4, end4));
