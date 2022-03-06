var removeElement = function (nums, val) {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val) {
      nums[i] = -1;
      count++;
    }
  }
  nums = nums.sort();
  nums = nums.reverse();
  return nums.length - count;
};
