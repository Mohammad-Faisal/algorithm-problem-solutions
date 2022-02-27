const combination = [];
const generateCombination = (
  currentLetter,
  currentIndex,
  availableWords,
  result
) => {
  if (currentLetter === availableWords.length) {
    if (combination.length > 0) result.push(combination.join(""));
    return;
  }
  if (currentIndex === availableWords[currentLetter].length) {
    return;
  }

  combination.push(availableWords[currentLetter][currentIndex]);
  generateCombination(currentLetter + 1, 0, availableWords, result);
  combination.pop();
  generateCombination(currentLetter, currentIndex + 1, availableWords, result);
};

const digitLetterMap = {
  "2": ["a", "b", "c"],
  "3": ["d", "e", "f"],
  "4": ["g", "h", "i"],
  "5": ["j", "k", "l"],
  "6": ["m", "n", "o"],
  "7": ["p", "q", "r", "s"],
  "8": ["t", "u", "v"],
  "9": ["w", "x", "y", "z"],
};

function letterCombinations(digits: string): string[] {
  const availableWords = [];
  const result = [];
  for (const digit of digits) {
    availableWords.push(digitLetterMap[digit]);
  }

  generateCombination(0, 0, availableWords, result);
  return result;
}
