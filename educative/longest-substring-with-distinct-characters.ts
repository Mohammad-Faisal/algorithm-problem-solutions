// https://www.educative.io/courses/grokking-the-coding-interview/YMzBx1gE5EO
const non_repeat_substring = function (str) {
  const visArr = new Array(130).fill(0);

  let left = 0;
  let right = 0;

  let maxLength = 0;
  while (right < str.length) {
    const index = str.charCodeAt(right);

    if (visArr[index] == 1) {
      left = bringLeftPointerForward(str, visArr, left, right);
    }
    visArr[index] = 1;

    if (right - left + 1 > maxLength) {
      maxLength = right - left + 1;
    }
    right++;
  }

  return maxLength;
};

const bringLeftPointerForward = (
  str,
  arr,
  currentLeftIndex,
  currentRightIndex
) => {
  const targetChar = str.charAt(currentRightIndex);
  let runningIndex = currentLeftIndex;
  while (runningIndex < str.length) {
    if (str.charAt(runningIndex) === targetChar) break;
    const index = str.charCodeAt(runningIndex);
    arr[index] = 0;
    runningIndex++;
  }
  return runningIndex + 1;
};
