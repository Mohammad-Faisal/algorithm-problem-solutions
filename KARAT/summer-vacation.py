"""
PROBLEM 3

It's fall, and leaves on the trees have turned a variety of colors. To relax on vacation, we're about to walk through the forest, and we'd like to find the length of the longest path that lets us see the leaves in a particular color order, that doesn't revisit the same area twice.

We will give you a data structure representing a forest, such as the following:

forest1 = [['B', 'B', 'O', 'R', 'G'],
           ['G', 'B', 'O', 'G', 'B'],
           ['O', 'R', 'Y', 'R', 'G'],
           ['B', 'Y', 'G', 'R', 'R']]

We would like to visit the trees in order (G)reen, (Y)ellow, (O)range, (R)ed, (B)arren. We will start at any G tree in the forest. From G, we can go to any G or Y tree, but once we go to a Y tree we cannot go back to G. From Y we can go to Y or O, from O we can go to O or R, and so on. We want to see each type of tree at least once.

From a given tree, we can travel in any of the 8 directions (up, down, left, right, and diagonally) to neighboring trees one space away.

In this example, one longest path is as follows:
B  B  O  R  G  |  B9 B8 O  R  G
G  B  O  G  B  |  G  B7 O  G2 B
O  R  Y  R  G  |  O5 R6 Y3 R  G1
B  Y  G  R  R  |  B  Y4 G  R  R

In this case we would return 9, the length of the longest path.

Write a function that takes in a data structure representing trees in a forest, and returns the length of the longest path visiting the trees in order G Y O R B. Return 0 if there is no such path.

All test cases:
longest_walk(forest1) => 9
longest_walk(forest2) => 6
longest_walk(forest3) => 7
longest_walk(forest4) => 25
longest_walk(forest5) => 10
longest_walk(forest6) => 0
longest_walk(forest7) => 0

Complexity variables:
R = The number of rows in the forest
C = the number of columns in the forest
"""

colorSerial = ["G" , "Y" ,"O" , "R" ,"B" ]

    
forest1 = [
  ["B", "B", "O", "R", "G"],
  ["G", "B", "O", "G", "B"],
  ["O", "R", "Y", "R", "G"],
  ["B", "Y", "G", "R", "R"]
]

forest2 = [
  ["G", "Y", "O", "O", "R", "B"],
  ["B", "B", "B", "G", "G", "G"]
]
forest3 = [
  ["G", "Y", "O", "R", "B"],
  ["B", "B", "B", "G", "G"]
]
forest4 = [
  ["G", "G", "G", "G", "G"],
  ["G", "Y", "Y", "Y", "G"],
  ["G", "Y", "O", "Y", "G"],
  ["G", "Y", "R", "Y", "G"],
  ["G", "G", "B", "G", "G"]
]
forest5 = [
  ["B", "R", "O", "B", "O"],
  ["Y", "R", "G", "Y", "B"],
  ["Y", "G", "B", "Y", "Y"],
  ["Y", "R", "R", "G", "O"],
  ["R", "Y", "O", "Y", "O"]
]
forest6 = [
  ["R", "Y", "O"],
  ["O", "Y", "Y"],
  ["Y", "Y", "Y"],
  ["R", "R", "R"],
  ["R", "B", "G"],
  ["G", "Y", "O"]
]
forest7 = [
  ["B", "G", "G", "B", "O"],
  ["G", "G", "G", "Y", "B"],
  ["Y", "G", "B", "Y", "Y"],
  ["R", "R", "R", "Y", "O"],
  ["R", "O", "B", "Y", "O"]
]

def findNextColor(currentColor):
    if currentColor == "G":
        return ["G" , "Y"]
    if currentColor == "Y":
        return ["O" , "Y"]
    if currentColor == "O":
        return ["O" , "R"]
    if currentColor == "R":
        return ["B" , "R"]
    if currentColor == "B":
        return ["B"]

def isValid(nextx , nexty , currentColor,  board , vis):
    
    if(nextx <0):
        return False
    if nexty<0:
        return False
    if nextx>= len(board):
        return False
    if nexty >=len(board[0]):
        return False
    
    if vis[nextx][nexty] == 1:
        return False
    nextColor = board[nextx][nexty]
    nextMoveColors = findNextColor(currentColor)
    if(nextColor not in nextMoveColors):
        return False
    return True
            



def dfs(curx , cury , board, vis  ,path, maxLen ):
    currentColor = board[curx][cury]
    path.append([curx,cury])
    vis[curx][cury] = 1
    
    if(currentColor == "B"):
        if len(path) > maxLen:
            maxLen = len(path)

    directions = [[0,1] , [0,-1] , [1,0], [-1,0] , [1,1], [1,-1] , [-1,1] , [-1,-1] ]
    for dir in directions:
        nextx = curx+dir[0]
        nexty = cury+dir[1]
    
        if isValid(nextx , nexty , board[curx][cury] , board , vis):
            res = dfs(nextx , nexty,board,vis,path,maxLen)
            maxLen = max(maxLen , res)
            
    vis[curx][cury] = 0
    path.remove([curx,cury])
    return maxLen

def findPathLength(forest):
    vis=[[0 for _ in range(len(forest[0]))] for _ in range(len(forest)) ]
    result = 0;
    for i in range(len(forest)):
        for j in range(len(forest[0])):
            if forest[i][j] == "G":
                result = max(result ,dfs( i, j, forest, vis, [],0))
    return result


# print(findPathLength(forest1))
# print(findPathLength(forest2))
# print(findPathLength(forest3))
# print(findPathLength(forest4))
# print(findPathLength(forest5))
# print(findPathLength(forest6))
# print(findPathLength(forest7))

"""
PROBLEM 2

While on vacation we have been playing a new deck building card game. In this game cards can do battle with each other and we want to figure out which cards can beat other cards.

Beating is transitive, that is if A beats B and B beats C then A beats C. If A beats B then B does not beat A (so there are no cycles in the matchups). Some cards can't ever do battle with each other so neither card beats the other.

We are trying to figure out which card is the most powerful, meaning the card that beats the most other cards. For example, say we have the following matchups:

matchups_1 = [
  # giant beats wizard
  ["giant", "wizard"],
  ["giant", "nymph"],
  ["wizard", "elf"],
  ["nymph", "muse"],
  ["orc", "elf"],
  ["orc", "goblin"],
  ["orc", "snake"]
]

Even though the orc directly beats three cards (elf, goblin, snake), the giant is the most powerful. The giant beats the wizard and nymph directly, and then elf and muse indirectly (through wizard and nymph). The giant beats four cards, and so it is the most powerful.

Write a function that takes in a list of card matchups and returns the card that beats the most other cards. If there is more than one return any one.

All test cases:
best_card(matchups_1) => giant
best_card(matchups_2) => roc
best_card(matchups_3) => vampire
best_card(matchups_4) => orc
best_card(matchups_5) => elf
best_card(matchups_6) => human
best_card(matchups_7) => dinosaur

Complexity variables: 
N = the length of the matchups list
"""
matchups_1 = [
        ["giant", "wizard"],
        ["giant", "nymph"],
        ["wizard", "elf"],
        ["nymph", "muse"],
        ["orc", "elf"],
        ["orc", "goblin"],
        ["orc", "snake"]
]
matchups_2 = [
        ["wizard", "elf"],
        ["elf", "elemental"],
        ["roc", "wizard"],
        ["roc", "nymph"],
        ["nymph", "satyr"],
        ["nymph", "muse"],
        ["orc", "elf"]
]
matchups_3 = [
        ["vampire", "beholder"],
        ["beholder", "elf"],
        ["elf", "orc"],
        ["orc", "snake"],
        ["snake", "hamster"],
        ["dragon", "roc"],
        ["dragon", "goblin"],
        ["dragon", "nymph"],
        ["dragon", "giant"]
]
matchups_4 = [
        ["dragon", "roc"],
        ["orc", "elf"],
        ["nymph", "muse"],
        ["snake", "hamster"],
        ["vampire", "beholder"],
        ["elf", "elemental"]
]
matchups_5 = [
        ["giant", "wizard"],
        ["giant", "nymph"],
        ["giant", "orc"],
        ["wizard", "orc"],
        ["wizard", "nymph"],
        ["orc", "nymph"],
        ["elf", "goblin"],
        ["elf", "spider"],
        ["elf", "rat"],
        ["elf", "kobold"]
]
matchups_6 = [
        ["giant", "wizard"],
        ["giant", "nymph"],
        ["giant", "orc"],
        ["wizard", "orc"],
        ["wizard", "nymph"],
        ["orc", "nymph"],
        ["elf", "goblin"],
        ["elf", "spider"],
        ["elf", "rat"],
        ["elf", "kobold"],
        ["human", "elf"]
]
matchups_7 = [
        ["giant", "wizard"],
        ["giant", "orc"],
        ["wizard", "orc"],
        ["wizard", "nymph"],
        ["dinosaur", "human"],
        ["orc", "nymph"],
        ["elf", "goblin"],
        ["elf", "kobold"],
        ["human", "elf"],
        ["elf", "spider"],
        ["elf", "rat"],
        ["giant", "nymph"]
]

from collections import defaultdict

def dfs(member , graph, items):
    for item in graph[member]:
        items.add(item)
        dfs(item,graph, items)
    return items

def best_card(matches):
    beaters = {}
    members = set()
    for item in matches:
        if item[0] not in beaters:
            beaters[item[0]] = []
        if item[1] not in beaters:
            beaters[item[1]] = []
        members.add(item[0])
        members.add(item[1])
        beaters[item[0]].append(item[1])
    
    result = 0
    resMember= ""
    for member in members:
        count = 0
        beaten = set()
        res = dfs(member,beaters, beaten )
        if len(res) > result:
            result = len(res)
            resMember= member
    return resMember
    
# print(best_card(matchups_1))
# print(best_card(matchups_2))
# print(best_card(matchups_3))
# print(best_card(matchups_4))
# print(best_card(matchups_5))
# print(best_card(matchups_6))
# print(best_card(matchups_7))


"""
We've been asked to write software to process monthly vacation requests.

In this office, vacation requests are accepted according to the following rules:
* Requests are accepted in priority order
* Requests are granted in the order they are requested
* A maximum of 3 days can be granted off per person in a month
* Each day can only be granted to one person

For example, say that our office receives the following requests and priorities:

requests_1 = [
  ["Ahmed", "20", "17", "21", "12"],  # Ahmed wants the 20th off the most, then 17th, 21st, and 12th, in that order
  ["Emma", "17", "1", "22"]           # Emma wants the 17th off the most, then 1st, then 22nd
]
priority_1_1 = ["Ahmed", "Emma"]

In this case, Ahmed would get the first three days requested (20, 17, 21). Emma would get two days (1, 22) since Ahmed took the 17th.

Write a function that takes in a list of requests and priorities, and returns the accepted vacation requests for each person. People who did not receive any accepted requests should still appear in the output.

All test cases (names and days can be in any order):
vacation(requests_1, priority_1_1) => Ahmed: 17, 20, 21; Emma: 1, 22
vacation(requests_1, priority_1_2) => Ahmed: 12, 20, 21; Emma 1, 17, 22
vacation(requests_2, priority_2_1) => Sara: 1, 21, 11; Hana: 18, 25, 17; Ren: 7, 15, 2; Mateo: 4, 27
vacation(requests_2, priority_2_2) => Hana: 1, 11, 18; Ren: 21, 7, 15; Sara: (none) ; Mateo: 4, 25, 27
vacation(requests_3, priority_3_1) => Youngwoo: 1; Miriam: (none);
vacation(requests_3, priority_3_2) => Miriam: 1; Youngwoo: (none);

Complexity variables:
N = The number of people in requests and priority
"""

requests_1 = [
  ["Ahmed", "20", "17", "21", "12"],
  ["Emma", "17", "1", "22"]
]
priority_1_1 = ["Ahmed", "Emma"]
priority_1_2 = ["Emma", "Ahmed"]
requests_2 = [
  ["Sara", "1", "21", "11", "15", "18", "7"],
  ["Hana", "1", "11", "18", "25", "17"],
  ["Ren", "21", "7", "15", "2", "25"],
  ["Mateo", "4", "7", "25", "27"]
]
priority_2_1 = ["Sara", "Hana", "Ren", "Mateo"]
priority_2_2 = ["Hana", "Ren", "Sara", "Mateo"]
requests_3 = [
  ["Youngwoo", "1"],
  ["Miriam", "1"]
]
priority_3_1 = ["Youngwoo", "Miriam"]
priority_3_2 = ["Miriam", "Youngwoo"]

def vacation(requests , priority):
    calander = {}
    
    requestMap = {}
    
    for item in requests:
        requestMap[item[0]] = item[1:]
    
    for priority in priority:
        for day in requestMap[priority]:
            if day not in calander:
                calander[day] = priority
    res = {}
    
    for item in requests:
        res[item[0]] = []
    
    
    for day in range(1,32):
        strDay = str(day)
        if strDay in calander:
            res[calander[strDay]].append(day)
        
    return res


print(vacation(requests_1, priority_1_1))