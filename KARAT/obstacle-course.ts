const obstacles_1 = [4, 6];
const obstacles_2 = [2, 9, 4];

const instructions_1 = "RRRJJRRR";
const instructions_2 = "RRRLJ";
const instructions_3 = "RRRJJRRRL";
const instructions_4 = "RRRLRJJRRR";
const instructions_5 = "RRRRRRRRRR";
const instructions_6 = "RRJJJJ";
const instructions_7 = "RLRRRJJRRLLJJJLRRRJJRRR";
const instructions_8 = "RRRJJRLJR";
const instructions_9 = "R";
const instructions_10 = "RJJRRRJ";

const level = (obstacle, instruction) => {
  let currentIndex = 0;
  let currentDirection = "R";
  for (let i = 0; i < instruction.length; i++) {
    const curInstruction = instruction[i];
    if (curInstruction === "R") {
      currentIndex++;
      currentDirection = "R";
    }
    if (curInstruction === "L") {
      currentIndex--;
      currentDirection = "L";
    }

    if (curInstruction === "J") {
      if (currentDirection === "R") {
        currentIndex += 2;
      } else {
        currentIndex -= 2;
      }
    }

    if (obstacle.find((item) => item === currentIndex)) {
      return false;
    }
    if (currentIndex === 10) return true;
  }
  return false;
};

// console.log(level(obstacles_1 , instructions_1))
// console.log(level(obstacles_1 , instructions_2))
// console.log(level(obstacles_1 , instructions_3))
// console.log(level(obstacles_1 , instructions_4))
// console.log(level(obstacles_1 , instructions_5))
// console.log(level(obstacles_1 , instructions_6))
// console.log(level(obstacles_1 , instructions_7))
// console.log(level(obstacles_1 , instructions_8))
// console.log(level(obstacles_1 , instructions_9))
// console.log(level(obstacles_2 , instructions_10))

const altitudes_1 = [0, 1, 2, 1];
const snow_1 = [
  [1, 0, 1, 0],
  [0, 0, 0, 0],
  [1, 1, 0, 2],
];

const altitudes_2 = [0, 0, 0, 0];
const snow_2 = [
  [2, 2, 2, 2],
  [1, 0, 0, 0],
  [1, 0, 0, 0],
];

const altitudes_3 = [0, 0, 0, 1];
const snow_3 = [
  [0, 0, 2, 0],
  [1, 1, 0, 0],
  [0, 0, 0, 0],
  [1, 1, 1, 0],
];

const altitudes_4 = [0, 1, 2, 0];
const snow_4 = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
];

const altitudes_5 = [0, 0, 0];
const snow_5 = [
  [5, 5, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const altitudes_6 = [0, 0, 0, 0, 0];
const snow_6 = [[2, 1, 2, 1, 2]];

// go by each day
// calculate the current state of snow of each of the posiiotins;
// calculate the required amoun of climb for that day.

const calculateStepsToClimb = (state) => {
  let climbs = 0;
  let curAlt = state[0][0];

  for (const position of state) {
    if (Math.abs(position[0] - curAlt) > 1) {
      return -1;
    }

    climbs += Math.abs(position[0] - curAlt);
    curAlt = position[0];
  }

  return climbs;
};

const bestDayToCross = (altitudes, snows) => {
  const state = [];

  for (const altitude of altitudes) {
    state.push([altitude, 0]);
  }

  let minDay = -1;
  let minClimb = 10000000;
  let day = 0;
  for (const forecast of snows) {
    let index = 0;

    for (const positionForecast of forecast) {
      if (positionForecast) {
        state[index][0] += positionForecast;
        state[index][1] = 0;
      } else {
        state[index][1]++;
        if (state[index][1] >= 2 && state[index][0] > altitudes[index]) {
          state[index][0]--;
        }
      }

      index++;
    }
    const requiredSteps = calculateStepsToClimb(state);
    if (requiredSteps != -1 && minClimb > requiredSteps) {
      minClimb = requiredSteps;
      minDay = day;
    }

    day++;
  }

  const finalClimb = minClimb === 10000000 ? -1 : minClimb;

  return [minDay, finalClimb];
};

// console.log(bestDayToCross(altitudes_1 , snow_1))
// console.log(bestDayToCross(altitudes_2 , snow_2))
// console.log(bestDayToCross(altitudes_3 , snow_3))
// console.log(bestDayToCross(altitudes_4 , snow_4))
// console.log(bestDayToCross(altitudes_5 , snow_5))
// console.log(bestDayToCross(altitudes_6 , snow_6))

const grid_1 = [
  [0, 8, 9],
  [0, 8, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const grid_2 = [
  [0, 0, 1, 0, 0, 0],
  [0, 0, 5, 9, 0, 0],
  [0, 0, 5, 0, 0, 0],
  [0, 0, 5, 0, 0, 0],
  [0, 0, 5, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];

const grid_3 = [
  [0, 1, 0, 0, 9, 0],
  [0, 3, 0, 0, 0, 0],
  [0, 4, 5, 0, 0, 0],
  [0, 0, 5, 0, 0, 0],
  [0, 0, 5, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];

const grid_4 = [
  [0, 8, 0],
  [4, 8, 0],
  [9, 8, 0],
  [0, 8, 0],
];

const grid_5 = [
  [0, 1, 0],
  [0, 0, 0],
  [0, 1, 0],
  [0, 8, 9],
];

const grid_6 = [
  [0, 1, 0],
  [8, 3, 0],
  [0, 9, 0],
];

const grid_7 = [[0, 1, 1, 9]];

const options = ["right", "left", "up", "down"];
let combination = [];
let shortest = 10;
let finalCombination = [];

const allCombinations = (grid) => {
  const isValidPath = findLastPosition(grid, combination);

  if (isValidPath) {
    if (combination.length < shortest) {
      finalCombination = [...combination];
      shortest = combination.length;
    }
  }

  if (combination.length == 6) {
    return;
  }

  for (const singleOption of options) {
    combination.push(singleOption);
    allCombinations(grid);
    combination.pop();
  }
};

const deepCopyOfGrid = (grid) => {
  const newGrid = [];
  for (let i = 0; i < grid.length; i++) {
    const temp = [];
    for (const item of grid[i]) {
      temp.push(item);
    }
    newGrid.push(temp);
  }

  return newGrid;
};

const findLastPosition = (grid, moves) => {
  let curX = 0;
  let curY = 0;

  const gridCopy = deepCopyOfGrid(grid);

  for (const move of moves) {
    if (move === "right") {
      curY = curY + 1;
    }

    if (move === "left") {
      curY = curY - 1;
    }

    if (move === "up") {
      curX = curX - 1;
    }

    if (move === "down") {
      curX = curX + 1;
    }

    if (curX > -1 && curY > -1 && curX < grid.length && curY < grid[0].length) {
      if (gridCopy[curX][curY] && gridCopy[curX][curY] !== 9) {
        gridCopy[curX][curY]--;
        curX = 0;
        curY = 0;
      }
    } else {
      return false;
    }
  }

  if (gridCopy[curX][curY] === 9) return true;
  return false;
};

const instructions = (grid) => {
  shortest = 10;
  finalCombination = [];
  combination = [];
  allCombinations(grid);
  return finalCombination;
};

console.log(instructions(grid_1));
console.log(instructions(grid_2));
console.log(instructions(grid_3));
console.log(instructions(grid_4));
console.log(instructions(grid_5));
console.log(instructions(grid_6));
console.log(instructions(grid_7));
