// https://www.educative.io/courses/grokking-the-coding-interview/YQQwQMWLx80
const longest_substring_with_k_distinct = function (str, k) {
  const visArr = new Array(130).fill(0);

  let left = 0;
  let right = 0;

  let maxLength = 0;
  while (right < str.length) {
    const index = str.charCodeAt(right);
    visArr[index]++;

    const instances = getCount(visArr);

    if (instances > k) {
      left = bringLeftPointerForward(str, visArr, k, left);
    }

    if (right - left + 1 > maxLength) {
      maxLength = right - left + 1;
    }
    right++;
  }

  return maxLength;
};

const bringLeftPointerForward = (str, arr, maxValue, currentLeftIndex) => {
  let runningIndex = currentLeftIndex;
  while (runningIndex < str.length) {
    if (getCount(arr) === maxValue) break;
    const index = str.charCodeAt(runningIndex);
    arr[index]--;
    runningIndex++;
  }
  return runningIndex;
};

const getCount = (arr) => {
  return arr.reduce((partial, a) => (a > 0 ? partial + 1 : partial), 0);
};

console.log(longest_substring_with_k_distinct("a", 1));
