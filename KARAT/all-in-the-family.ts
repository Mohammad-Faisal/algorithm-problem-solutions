// const pairs = [
//   [5, 6], [1, 3], [2, 3], [3, 6], [15, 12],
//   [5, 7], [4, 5], [4, 9], [9, 12], [30, 16]
// ];

const findNodesWithZeroAndOneParents = (pairs) => {
  const parents = {};
  for (const singleRelation of pairs) {
    if (!parents[singleRelation[1]]) parents[singleRelation[1]] = [];
    if (!parents[singleRelation[0]]) parents[singleRelation[0]] = [];
    parents[singleRelation[1]].push(singleRelation[0]);
  }

  const zeroParents = [];
  const oneParent = [];

  Object.keys(parents).forEach((key) => {
    const numberOfParents = parents[key].length;
    if (numberOfParents === 0) zeroParents.push(key);
    else if (numberOfParents === 1) oneParent.push(key);
  });

  return [zeroParents, oneParent];
};

const pairs = [
  [1, 3],
  [2, 3],
  [3, 6],
  [5, 6],
  [5, 7],
  [4, 5],
  [15, 21],
  [4, 8],
  [4, 9],
  [9, 11],
  [14, 4],
  [13, 12],
  [12, 9],
  [15, 13],
];

let vis = new Array(30).fill(0);
const parents = {};
let isFound = false;

const dfs = (current) => {
  for (const child of parents[current]) {
    dfs(child);
  }
  vis[current]++;
  if (vis[current] === 2) isFound = true;
};

const hasCommonAncestor = (pairs, firstPerson, secondPerson) => {
  for (const singleRelation of pairs) {
    if (!parents[singleRelation[1]]) parents[singleRelation[1]] = [];
    if (!parents[singleRelation[0]]) parents[singleRelation[0]] = [];
    parents[singleRelation[1]].push(singleRelation[0]);
  }

  vis = new Array(30).fill(0);
  isFound = false;

  dfs(firstPerson);
  vis[firstPerson]--;
  dfs(secondPerson);

  return isFound;
};

const pairs1 = [
  [2, 3],
  [3, 15],
  [3, 6],
  [5, 6],
  [5, 7],
  [4, 5],
  [4, 8],
  [4, 9],
  [9, 11],
  [14, 4],
];

const pairs2 = [
  [2, 3],
  [3, 15],
  [3, 6],
  [5, 6],
  [5, 7],
  [4, 5],
  [4, 8],
  [4, 9],
  [9, 11],
  [14, 2],
  [1, 9],
];

const dfsWithLevel = (current, level) => {
  for (const child of parents[current]) {
    dfsWithLevel(child, level + 1);
  }
  vis[current] = level;
};

const findEarliestAncestor = (pairs, person) => {
  for (const singleRelation of pairs) {
    if (!parents[singleRelation[1]]) parents[singleRelation[1]] = [];
    if (!parents[singleRelation[0]]) parents[singleRelation[0]] = [];
    parents[singleRelation[1]].push(singleRelation[0]);
  }

  vis = new Array(30).fill(0);

  dfsWithLevel(person, 1);
  let max = 0;
  let earliestAncestor = -1;

  vis.forEach((item, index) => {
    if (item > max) {
      max = item;
      earliestAncestor = index;
    }
  });
  if (earliestAncestor === person) return -1;
  return earliestAncestor;
};
