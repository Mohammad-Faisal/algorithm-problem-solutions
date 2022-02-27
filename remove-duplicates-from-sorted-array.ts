/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let front = 0;
  let back = 0;
  let length = nums.length;
  while (true) {
    if (front === nums.length) break;

    if (front === back) {
      front++;
    } else if (nums[back] === nums[front]) {
      nums.splice(front, 1);
    } else {
      back++;
      front++;
    }
  }
  return nums.length;
};
