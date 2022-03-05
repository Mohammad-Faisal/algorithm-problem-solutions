function lengthOfLongestSubstring(s: string): number {
  const dynamicList = new Array(130).fill(0);
  let left = 0;
  let right = 0;

  const lengthOfString = s.length;
  let maxLength = 0;

  while (right < lengthOfString) {
    const letterIndex: number = s.charCodeAt(right);
    if (dynamicList[letterIndex] === 1) {
      left = bringLeftIndexForward(s, left, right, dynamicList);
    }
    if (right - left + 1 > maxLength) maxLength = right - left + 1;
    dynamicList[letterIndex] = 1;
    right++;
  }
  return maxLength;
}

function bringLeftIndexForward(s, left, right, dynamicList) {
  const targetCharacter = s.charAt(right);
  while (s[left] !== targetCharacter) {
    dynamicList[s.charCodeAt(left)] = 0;
    left++;
  }
  return left + 1;
}
