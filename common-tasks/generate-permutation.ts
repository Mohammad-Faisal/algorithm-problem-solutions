const members = [1, 2, 3];
let allCombinations = [];
let isTaken = [0, 0, 0, 0, 0, 0];
const generateAllPermutation = (isTaken) => {
  if (allCombinations.length === members.length) {
    console.log(allCombinations);
    return;
  }
  for (let i = 0; i < members.length; i++) {
    if (!isTaken[i]) {
      allCombinations.push(members[i]);
      isTaken[i] = 1;
      generateAllPermutation(isTaken);
      isTaken[i] = 0;
      allCombinations.pop();
    }
  }
};
