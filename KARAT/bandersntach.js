/**
 * You are reading a Build Your Own Story book. It is like a normal book except that choices on some pages affect the story, sending you to one of two options for your next page.

These choices are really stressing you out, so you decide that you'll either always pick the first option, or always pick the second option.

You start reading at page 1 and read forward one page at a time unless you reach a choice or an ending.

The choices are provided in a list, sorted by the page containing the choice, and each choice has two options of pages to go to next. In this example, you are on page 3, where there is a choice. Option 1 goes to page 14 and Option 2 goes to page 2.

choices1 = [[3, 14, 2]] => [current_page, option_1, option_2]
The ending pages are also given in a sorted list:

endings = [6, 15, 21, 30]

Given a list of endings, a list of choices with their options, and the choice you will always take (Option 1 or Option 2), return the ending you will reach. If you get stuck in a loop, return -1.


Example:
find_ending(endings, choices1, 1) (always Option 1)
  Start: 1 -> 2 -> 3(choice) -> 14 -> 15(end) => Return 15

find_ending(endings, choices1, 2) (always Option 2)
  Start: 1 -> 2 -> 3(choice) -> 2 -> 3(choice) -> 2... => Return -1

Additional inputs:
choices2 = [[5, 11, 28], [9, 19, 29], [14, 16, 20], [18, 7, 22], [25, 6, 30]]
choices3 = []
choices4 = [[2, 10, 15], [3, 4, 10], [4, 3, 15], [10, 3, 15]]

Complexity Variable:
n = number of pages
(endings and choices are bound by the number of pages)

All Test Cases - snake_case:
find_ending(endings, choices1, 1) => 15
find_ending(endings, choices1, 2) => -1
find_ending(endings, choices2, 1) => 21
find_ending(endings, choices2, 2) => 30
find_ending(endings, choices3, 1) => 6
find_ending(endings, choices3, 2) => 6
find_ending(endings, choices4, 1) => -1
find_ending(endings, choices4, 2) => 15

All Test Cases - camelCase:
findEnding(endings, choices1, 1) => 15
findEnding(endings, choices1, 2) => -1
findEnding(endings, choices2, 1) => 21
findEnding(endings, choices2, 2) => 30
findEnding(endings, choices3, 1) => 6
findEnding(endings, choices3, 2) => 6
findEnding(endings, choices4, 1) => -1
findEnding(endings, choices4, 2) => 15
 */

// const endings = [6, 15, 21, 30];
// const choices1 = [[3, 14, 2]];
// const choices2 = [[5, 11, 28], [9, 19, 29], [14, 16, 20], [18, 7, 22], [25, 6, 30]];
// const choices3 = [];
// const choices4 = [[2, 10, 15], [3, 4, 10], [4, 3, 15], [10, 3, 15]];

const findEnding = (endings , choices , option) => {
  // create endings map to check if I am at end
  
  const endingsMap = {};
  for(const item of endings){
    endingsMap[item] = 1;
  }

  const transitionMap = {} ;
  for(const item of choices){
    transitionMap[item[0]] = {
      '1': item[1],
      '2': item[2]
    }
  }
  
  let currentPage =1;
  const vis ={}
  
  while(true){
    
    if(endingsMap[currentPage]) return currentPage; 
    
    if(vis[currentPage]) return -1;
    else vis[currentPage] =1;
    
    if(transitionMap[currentPage]){
      currentPage = transitionMap[currentPage][option];
    }else{
      currentPage++;
    }
  }
}

// console.log(findEnding(endings, choices1, 1) )
// console.log(findEnding(endings, choices1, 2) )
// console.log(findEnding(endings, choices2, 1) )
// console.log(findEnding(endings, choices2, 2) )
// console.log(findEnding(endings, choices3, 1) )
// console.log(findEnding(endings, choices3, 2) )
// console.log(findEnding(endings, choices4, 1)) 
// console.log(findEnding(endings, choices4, 2))

/**
 * As you are reading the book multiple times, you notice that you always get bad endings. You start to suspect there is no way to get to the good endings, so you decide to find out.

Good and bad endings will be separate lists of page numbers, like this:

good_endings = [10, 15, 25, 34]
bad_endings = [21, 30, 40]

Given lists of good endings, bad endings, and a list of the choices along with their options, return a collection of all the reachable good endings, if any.

Examples:

choices1 = [[3, 16, 24]]
find_good_endings(good_endings, bad_endings, choices1)
  Start: 1 -> 2 -> 3(choice) -> 16 -> 17... -> 21(bad ending)
                   |
                   -> 24 -> 25(good ending)
Thus it is possible to reach the good ending at 25 but no others, so we return [25].

choices2 = [[3, 16, 20]]
find_good_endings(good_endings, bad_endings, choices2)
  Start: 1 -> 2 -> 3(choice) -> 16 -> 17... -> 21(bad ending)
                   |
                   > 20 -> 21(bad ending)
No good ending is reachable, so return [].

Additional Inputs:
choices3 = [[3, 2, 19], [20, 21, 34]]
choices4 = []
choices5 = [[9, 16, 26], [14, 16, 13], [27, 29, 28], [28, 15, 34], [29, 30, 38]]
choices6 = [[9, 16, 26], [13, 31, 14], [14, 16, 13], [27, 12, 24], [32, 34, 15]]
choices7 = [[3, 9, 10]]

Complexity Variable:
n = number of pages
(endings and choices are bound by the number of pages)

All Test Cases - snake_case:
find_good_endings(good_endings, bad_endings, choices1) => [25]
find_good_endings(good_endings, bad_endings, choices2) => []
find_good_endings(good_endings, bad_endings, choices3) => [34]
find_good_endings(good_endings, bad_endings, choices4) => [10]
find_good_endings(good_endings, bad_endings, choices5) => [15, 34]
find_good_endings(good_endings, bad_endings, choices6) => [15, 25, 34]
find_good_endings(good_endings, bad_endings, choices7) => [10]

All Test Cases - camelCase:
findGoodEndings(goodEndings, badEndings, choices1) => [25]
findGoodEndings(goodEndings, badEndings, choices2) => []
findGoodEndings(goodEndings, badEndings, choices3) => [34]
findGoodEndings(goodEndings, badEndings, choices4) => [10]
findGoodEndings(goodEndings, badEndings, choices5) => [15, 34]
findGoodEndings(goodEndings, badEndings, choices6) => [15, 25, 34]
findGoodEndings(goodEndings, badEndings, choices7) => [10]
 */



// const dfs = (currentPage , goodEndingsMap , badEndingsMap , transitionMap, vis) => {
    
//     if(vis[currentPage]) {
//       return [];
//     }
//     if(badEndingsMap[currentPage]){
//       return [];
//     }
//     if(goodEndingsMap[currentPage]){
//       return [currentPage];
//     }
    
    
//     vis[currentPage] = 1;
    
    
//     if(transitionMap[currentPage]){
//       const possibleResultForChoice1 = dfs(transitionMap[currentPage]['1'] , goodEndingsMap , badEndingsMap , transitionMap, vis);
//       const possibleResultForChoice2 =dfs(transitionMap[currentPage]['2'] , goodEndingsMap , badEndingsMap , transitionMap , vis);
      
//       return [...possibleResultForChoice1 , ...possibleResultForChoice2]
//     }else{
//       return dfs(currentPage+1 , goodEndingsMap , badEndingsMap , transitionMap, vis);
//     }
// }


// const findGoodEndings = (goodEndings, badEndings, choices) => {
//   // try to go to the next page
  
//   const goodEndingsMap = {};
//   for(const item of goodEndings){
//     goodEndingsMap[item] = 1;
//   }

//   const badEndingsMap = {};
//   for(const item of badEndings){
//     badEndingsMap[item] = 1;
//   }
  
  
  
//   const transitionMap = {} ;
//   for(const item of choices){
//     transitionMap[item[0]] = {
//       '1': item[1],
//       '2': item[2]
//     }
//   }
  
//   const result = dfs(1 ,goodEndingsMap , badEndingsMap , transitionMap , {});
  
//   return result;
  
  
// }

const goodEndings = [10, 15, 25, 34];
const badEndings = [21, 30, 40];

const choices1 = [[3, 16, 24]];
const choices2 = [[3, 16, 20]];
const choices3 = [[3, 2, 19], [20, 21, 34]];
const choices4 = [];
const choices5 = [[9, 16, 26], [14, 16, 13], [27, 29, 28], [28, 15, 34], [29, 30, 38]];
const choices6 = [[9, 16, 26], [13, 31, 14], [14, 16, 13], [27, 12, 24], [32, 34, 15]];
const choices7 = [[3, 9, 10]];


// console.log(findGoodEndings(goodEndings, badEndings, choices1)) //=> [25]
// console.log(findGoodEndings(goodEndings, badEndings, choices2)) //=> []
// console.log(findGoodEndings(goodEndings, badEndings, choices3)) //=> [34]
// console.log(findGoodEndings(goodEndings, badEndings, choices4)) //=> [10]
// console.log(findGoodEndings(goodEndings, badEndings, choices5)) //=> [15, 34]
// console.log(findGoodEndings(goodEndings, badEndings, choices6)) //=> [15, 25, 34]
// console.log(findGoodEndings(goodEndings, badEndings, choices7)) //=> [10]

/**
 * You really love this book and so you decide to read all possible story sequences. You notice that you are reading some pages more than others, so you want to find out which page you have read the most often when you read every storyline that leads to an ending.

You set some rules for your reading to avoid repeating pages too often. These rules are:

1) All storylines start at page 1.
2) Within any one storyline, you will never make the same choice twice (you may choose the other option)
3) If you reach a choice where you've already made both choices, you will not reach an ending, so this is not a valid storyline.

Given a list of endings and a list of choices with their destinations, return the page which was read the most often, as well as the number of times it was read. If multiple pages were read the same number of times, you may return any of them. If there are no valid storylines, return -1.

Example:
endings1 = [5, 10]
choices1_1 = [[3, 7, 9], [9, 10, 8]]

1 -> 2 -> 3(choice) -> 7 -> 8 -> 9(choice) -> 10(ending)
          |                      |
          |                      8 -> 9(choice, can't repeat 8) -> 10
          9(choice) -> 10(ending)
          |
          8 -> 9(choice, can't repeat 8) -> 10

All Storylines:
1->2->3->7->8->9->10
1->2->3->7->8->9->8->9->10
1->2->3->9->10
1->2->3->9->8->9->10

Page reads:
(1:4), (2:4), (3:4), (4:0), (5:0), (6:0), (7:2), (8:4), (9:6), (10:4)
Page with most reads = Page: 9, Reads: 6 (outputs can be in any format)

Example 2:
choices1_2 = [[3, 1, 2]]

1 -> 2 -> 3(choice) -> 1 -> 2 -> 3(choice, can't repeat 1) -> 2 -> 3(choice, can't repeat 1 or 2, invalid storyline)
          |
          2 -> 3(choice, can't repeat 2) -> 1 -> 2 -> 3(choice, can't repeat 1 or 2, invalid storyline)
There are no valid storylines, so return Page: -1, Reads: -1
Additional Inputs:
choices1_3 = [[3, 4, 1]]
choices1_4 = []

endings2 = [15, 10, 21, 25, 30]
choices2_1 = [[3, 2, 19], [7, 9, 15], [14, 23, 28], [20, 13, 4], [24, 10, 30], [29, 21, 25]]
choices2_2 = [[9, 16, 26], [14, 16, 13], [27, 14, 24]] 

endings3 = [14, 15, 23, 32, 37]
choices3_1 = [[7, 8, 30], [8, 10, 28], [9, 18, 15], [10, 27, 11], [30, 25, 13]]

endings4 = [35]
choices4_1 = [[20, 25, 30], [31, 19, 32]]

Complexity Variable:
n = number of pages
(endings and choices are bound by the number of pages)

All Test Cases - snake_case (outputs can be in any format):
most_read(endings1, choices1_1) => Page: 9,  Reads: 6
most_read(endings1, choices1_2) => Page: -1, Reads: -1 (there are no paths through the book)
most_read(endings1, choices1_3) => Page: (any of) 1/2/3,  Reads: 3
most_read(endings1, choices1_4) => Page: (any of) 1/2/3/4/5,  Reads: 1
most_read(endings2, choices2_1) => Page: (any of) 2/3,  Reads: 18
most_read(endings2, choices2_2) => Page: (any of) 1-9,  Reads: 4
most_read(endings3, choices3_1) => Page: 30, Reads: 9
most_read(endings4, choices4_1) => Page: (any of) 19/20/30/31, Reads: 6

All Test Cases - camelCase (outputs can be in any format):
mostRead(endings1, choices1_1) => Page: 9,  Reads: 6
mostRead(endings1, choices1_2) => Page: -1, Reads: -1 (there are no paths through the book)
mostRead(endings1, choices1_3) => Page: (any of) 1/2/3,  Reads: 3
mostRead(endings1, choices1_4) => Page: (any of) 1/2/3/4/5,  Reads: 1
mostRead(endings2, choices2_1) => Page: (any of) 2/3,  Reads: 18
mostRead(endings2, choices2_2) => Page: (any of) 1-9,  Reads: 4
mostRead(endings3, choices3_1) => Page: 30, Reads: 9
mostRead(endings4, choices4_1) => Page: (any of) 19/20/30/31, Reads: 6
 */


const dfs = (currentPage , endingsMap, transitionMap ,choicesMade, storyLines) => {
    
    
    if(endingsMap[currentPage]){
      storyLines.push(currentPage);
      // console.log('valid story line' , storyLines)
      return storyLines;
    }
    
    let paths = [];
    
    if(transitionMap[currentPage]){
      
      if(!choicesMade[currentPage]['1']){
        choicesMade[currentPage][1] = 1;
        paths.push(dfs(transitionMap[currentPage]['1'] , endingsMap , transitionMap, choicesMade , [...storyLines , currentPage]));
        choicesMade[currentPage][1] = 0;
      }
      
      if(!choicesMade[currentPage]['2']){
        choicesMade[currentPage][2] = 1;
        paths.push(dfs(transitionMap[currentPage]['2'] , endingsMap , transitionMap, choicesMade , [...storyLines , currentPage]));
        choicesMade[currentPage][2] = 0;
      }
      
      const res= []
      if(paths[0]) res.push(...paths[0])
      if(paths[1]) res.push(...paths[1])
      return res
      
    }else{
      return dfs(currentPage+1 , endingsMap , transitionMap, choicesMade , [...storyLines , currentPage]);
    }
}


const findGoodEndings = (endings, choices) => {
  // try to go to the next page
  
  const endingsMap = {};
  for(const item of endings){
    endingsMap[item] = 1;
  }
  
  const transitionMap = {} ;
  const choicesMade ={};
  for(const item of choices){
    transitionMap[item[0]] = {
      '1': item[1],
      '2': item[2]
    }
    choicesMade[item[0]] ={
      '1': 0,
      '2': 0
    }
  }
  
  const result = dfs(1 ,endingsMap, transitionMap, choicesMade, [] );
  
  const counter ={};
  
  let maxRead = -1 
  let maxPage = -1;
  
  console.log(result)
  
  for(const pageNum of result){
    if(!counter[pageNum])counter[pageNum] = 0;
    
    counter[pageNum]++;
    
    
    if(counter[pageNum] > maxRead){
      maxRead = counter[pageNum];
      maxPage = pageNum
    }
  }
  
  return {maxPage , maxRead};  
}

const endings1 = [5, 10];
const choices1_1 = [[3, 7, 9], [9, 10, 8]];
const choices1_2 = [[3, 1, 2]];
const choices1_3 = [[3, 4, 1]];
const choices1_4 = [];

const endings2 = [10, 15, 21, 25, 30];
const choices2_1 = [[3, 2, 19], [7, 9, 15], [14, 23, 28], [20, 13, 4], [24, 10, 30], [29, 21, 25]];
const choices2_2 = [[9, 16, 26], [14, 16, 13], [27, 14, 24]];

const endings3 = [14, 15, 23, 32, 37];
const choices3_1 = [[7, 8, 30], [8, 10, 28], [9, 18, 15], [10, 27, 11], [30, 25, 13]];

const endings4 = [35];
const choices4_1 = [[20, 25, 30], [31, 19, 32]];

console.log(findGoodEndings(endings1 , choices1_1))
console.log(findGoodEndings(endings1 , choices1_2))
