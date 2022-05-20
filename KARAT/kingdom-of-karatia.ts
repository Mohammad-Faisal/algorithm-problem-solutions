/*
We are in the finance department of the Great Kingdom of Karatia!

The King has asked you to write a function which returns the maximum balance at the end of any day, along with the day of the maximum balance.

The account initially has a balance provided as an input. The month starts on the 0th day. Records are sorted and there can be multiple records in a day.

account_balance_1 = 100
account_records_1 = [
   #["Day", "CREDIT/DEBIT", "AMOUNT"]
    ["1", "CREDIT", "100"],
    ["2", "DEBIT",  "200"],
    ["2", "CREDIT", "150"],
    ["3", "CREDIT", "800"],
    ["3", "DEBIT", "500"],
    ["4", "DEBIT",  "400"]
];



The total at the end of each day:
| Day | Balance |
|  0  |   100   |
|  1  |   200   |
|  2  |   150   |
|  3  |   450   |
|  4  |    50   |

Sample output:
find_maximum_balance(account_balance_1, account_records_1) → {3, 450}

Explanation: Only the balance at the end of the day should count towards the overall maximum


account_balance_2 = 100000
account_records_2 = [
   #["Date", "CREDIT/DEBIT", "AMOUNT"]
    ["1", "CREDIT", "1000"],
    ["2", "DEBIT",  "2000"],
    ["2", "CREDIT", "1325"],
    ["3", "CREDIT", "80000"],
    ["3", "DEBIT", "75000"],
    ["4", "DEBIT",  "40000"],
    ["5", "CREDIT", "10000"],
    ["6", "DEBIT",  "4000"],
    ["6", "CREDIT", "50000"],
    ["7", "CREDIT", "2000"]
];

account_balance_3 = 500000
account_records_3 = [
   #["Date", "CREDIT/DEBIT", "AMOUNT"]
    ["1", "DEBIT", "10000"],
    ["2", "CREDIT", "2000"],
    ["3", "CREDIT", "6000"],
    ["4", "DEBIT",  "40000"]
]

account_balance_4 = 10000
account_records_4 = [
   #["Date", "CREDIT/DEBIT", "AMOUNT"]
    ["2", "CREDIT", "1000"],
    ["14", "DEBIT",  "1100"]
]

find_maximum_balance(account_balance_1, account_records_1) → {3, 450}
find_maximum_balance(account_balance_2, account_records_2) → {7, 123325}
find_maximum_balance(account_balance_3, account_records_3) → {0, 500000}
find_maximum_balance(account_balance_4, account_records_4) → {2, 11000} or {3, 11000}
Explanation: Some days may be missing.


Complexity analysis variables:

N: entries in the account records

*/
const account_balance_1 = 100;

const account_records_1 = [
  ["1", "CREDIT", "100"],
  ["2", "DEBIT", "200"],
  ["2", "CREDIT", "150"],
  ["3", "CREDIT", "800"],
  ["3", "DEBIT", "500"],
  ["4", "DEBIT", "400"],
];

const account_balance_2 = 100000;

const account_records_2 = [
  ["1", "CREDIT", "1000"],
  ["2", "DEBIT", "2000"],
  ["2", "CREDIT", "1325"],
  ["3", "CREDIT", "80000"],
  ["3", "DEBIT", "75000"],
  ["4", "DEBIT", "40000"],
  ["5", "CREDIT", "10000"],
  ["6", "DEBIT", "4000"],
  ["6", "CREDIT", "50000"],
  ["7", "CREDIT", "2000"],
];

const account_balance_3 = 500000;

const account_records_3 = [
  ["1", "DEBIT", "10000"],
  ["2", "CREDIT", "2000"],
  ["3", "CREDIT", "6000"],
  ["4", "DEBIT", "40000"],
];

const account_balance_4 = 10000;

const account_records_4 = [
  ["2", "CREDIT", "1000"],
  ["4", "DEBIT", "1100"],
];

const findMaximumBalance = (accountBalance, records) => {
  let runningBalance = accountBalance;

  let maxBalance = -10000000;
  let maxBalanceDay = -1;

  const changeInBalance = {};

  for (const item of records) {
    const day = item[0];
    const totalChange = 0;
    if (!changeInBalance[day]) changeInBalance[day] = 0;
    if (item[1] === "CREDIT") changeInBalance[day] += parseInt(item[2]);
    else changeInBalance[day] -= parseInt(item[2]);
  }
  for (let i = 0; i < 32; i++) {
    runningBalance = runningBalance + (changeInBalance[i] ?? 0);
    if (runningBalance > maxBalance) {
      maxBalance = runningBalance;
      maxBalanceDay = i;
    }
  }

  return { maxBalance, maxBalanceDay };
};

// console.log(findMaximumBalance(account_balance_1 , account_records_1))
// console.log(findMaximumBalance(account_balance_2 , account_records_2))
// console.log(findMaximumBalance(account_balance_3 , account_records_3))
// console.log(findMaximumBalance(account_balance_4 , account_records_4))

/*
We are in the finance department of the Great Kingdom of Karatia! There are many royal families living in the Kingdom. Each person in a family has wealth, which is associated with them.

The wealth of a family is the sum of wealth of all members of the family. If a person has two parents, then their wealth is equally divided between both of the parents. Each person can have up to two parents and any number of children. The oldest person in a family (who has no parents) is the head of that family.

The King has asked you to write a function that finds the richest family's head in the Kingdom along with their family's wealth.

person_wealth_1 = [
   #["NAME", "AMOUNT"]
    ["Bob", "20"],     ["Martin", "-100"],   ["Jack", "40"],    ["Alice", "20"],
    ["Mike", "50"],    ["Josh", "-20"],      ["Loki", "-50"],   ["Odin", "150"],
]

parent_child_1 = [
   #["PARENT", "CHILD"]
    ["Martin", "Odin"],   ["Loki", "Martin"],   ["Bob", "Loki"],   ["Odin", "Jack"],
    ["Loki", "Mike"],     ["Alice", "Mike"],    ["Josh", "Loki"]
]


Visual Representation:

  +--------+      +--------+   +---------+
  |   Bob  |      |  Josh  |   |  Alice  |
  |   20   |      |  -20   |   |   20    |
  +--------+-+  +-+--------+   +----+----+
             |  |                   |
          +--v--v--+                |
     +----+  Loki  +------+   +-----+
     |    |  -50   |      |   |
     |    +--------+      |   |
+----v----+            +--v---v--+
|  Martin |            |   Mike  |
|  -100   |            |    50   |
+----+----+            +---------+
     |
+----v----+
|   Odin  |
|   150   |
+----+----+
     |
+----v----+
|  Jack   |
|   40    |
+---------+

These are the family heads along with the total wealth:
Alice :  20(Alice) +  25(Mike) =  45
Bob   :  20(Bob)   -  25(Loki) +  12.5(Mike) - 50(Martin) + 75(Odin) + 20(Jack) = 52.5
Josh  : -20(Josh)  -  25(Loki) +  12.5(Mike) - 50(Martin) + 75(Odin) + 20(Jack) = 12.5

This is the calculated wealth for the rest of the members:
Loki   :  -50(Loki)    +  25(Mike) - 100(Martin) + 150(Odin) + 40(Jack) = 65
Martin :  -100(Martin) + 150(Odin) +  40(Jack)   = 90
Odin   :   150(Odin)   +  40(Jack) = 190
Mike   :   50
Jack   :   40

Sample output:
find_richest_head(person_wealth_1, parent_child_1) → {Bob, 52.5}

Additional Test Cases:

person_wealth_2 = [
    ["Bob", "120"],    ["Mike", "40"],    ["Loki", "10"]
]

parent_child_2 = [
    ["Loki", "Mike"]
]

+-------+       +--------+
|  Bob  |       |  Loki  |
|  120  |       |   10   |
+-------+       +---+----+
                    |    
                +---v----+
                |  Mike  |
                |   40   |
                +--------+


find_richest_head(person_wealth_1, parent_child_1) → {Bob, 52.5}
find_richest_head(person_wealth_2, parent_child_2) → {Bob, 120}

Complexity analysis variables:
N: people in the Kingdom

*/

// dfs(currentNode , currentLevel)

// console.log( Math.pow(2,3))
const dfs = (
  currentMember,
  currentLevel,
  graph,
  wealthDistribution,
  parentCount
) => {
  if (graph[currentMember].length === 0) {
    let totalWealth = wealthDistribution[currentMember];
    const sharedWealth = totalWealth / (parentCount[currentMember] ?? 1);
    return sharedWealth;
  }

  let total = wealthDistribution[currentMember];
  for (const child of graph[currentMember]) {
    total =
      total +
      dfs(child, currentLevel + 1, graph, wealthDistribution, parentCount);
  }

  return total / (parentCount[currentMember] ?? 1);
};

const findRichestHead = (wealth, relation) => {
  const graph = {};
  const parentCount = {};
  const members = new Set<string>();
  for (const item of relation) {
    if (!graph[item[0]]) graph[item[0]] = [];
    if (!graph[item[1]]) graph[item[1]] = [];
    if (!parentCount[item[1]]) parentCount[item[1]] = 0;

    graph[item[0]].push(item[1]);

    parentCount[item[1]]++;

    members.add(item[0]);
    members.add(item[1]);
  }

  const wealthDistribution = {};
  for (const item of wealth) {
    if (!wealthDistribution[item[0]]) wealthDistribution[item[0]] = 0;
    members.add(item[0]);
    if (!graph[item[0]]) graph[item[0]] = [];
    wealthDistribution[item[0]] = parseInt(item[1]);
  }

  let maxWealth = -100000000;
  let maxPerson = "";

  for (const member of members) {
    if (!parentCount[member]) {
      const wealthForThisPerson = dfs(
        member,
        0,
        graph,
        wealthDistribution,
        parentCount
      );
      if (wealthForThisPerson > maxWealth) {
        maxWealth = wealthForThisPerson;
        maxPerson = member;
      }
    }
  }

  return { maxPerson, maxWealth };
};

const person_wealth_1 = [
  ["Bob", "20"],
  ["Martin", "-100"],
  ["Jack", "40"],
  ["Alice", "20"],
  ["Mike", "50"],
  ["Josh", "-20"],
  ["Loki", "-50"],
  ["Odin", "150"],
];

const parent_child_1 = [
  ["Josh", "Loki"],
  ["Martin", "Odin"],
  ["Loki", "Martin"],
  ["Bob", "Loki"],
  ["Odin", "Jack"],
  ["Loki", "Mike"],
  ["Alice", "Mike"],
];

const person_wealth_2 = [
  ["Bob", "120"],
  ["Mike", "40"],
  ["Loki", "10"],
];

const parent_child_2 = [["Loki", "Mike"]];

// console.log(findRichestHead(person_wealth_1 , parent_child_1))
// console.log(findRichestHead(person_wealth_2 , parent_child_2))

/*
The King of the Great Kingdom of Karatia has decided to invite members of the community for a dinner at the King's palace. You are in charge of the arrangements for the grand dinner. However, not all invited members like each other.

The King has asked you to write a function which takes the list of guests and a list of guests who don't like each other, and returns the number of possible seating arrangements with the minimum number of tables required such that no two rivals sit next to each other on the same table. All invited guests are facing the King.

invited_guests_1 = ["Bob", "Martin", "Jack", "Mike", "Josh", "Loki"]

rivals_1 = [
  ["Loki", "Martin"],    ["Bob", "Loki"],
  ["Mike", "Loki"],      ["Jack", "Josh"],
  ["Martin", "Josh"],    ["Martin", "Mike"],
  ["Bob", "Jack"],       ["Jack", "Loki"],
  ["Bob", "Josh"],       ["Martin", "Jack"],
  ["Bob", "Mike"]
]

For the above input, one possible arrangement is this:

                             +------+
                             | KING |
                             +------+


+--------------------+       +----------------------------------+
|                    |       |                                  |
+--------------------+       +----------------------------------|
  +-----+  +--------+         +------+ +------+ +------+ +-----+
  | Bob |  | Martin |         | Jack | | Mike | | Josh | | Loki|
  +-----+  +--------+         +------+ +------+ +------+ +-----+


All possible arrangements:
[ [Bob, Martin], [Jack, Mike, Josh, Loki] ]
[ [Bob, Martin], [Loki, Josh, Mike, Jack] ]
[ [Martin, Bob], [Jack, Mike, Josh, Loki] ]
[ [Martin, Bob], [Loki, Josh, Mike, Jack] ]
[ [Jack, Mike, Josh, Loki], [Bob, Martin] ]
[ [Jack, Mike, Josh, Loki], [Martin, Bob] ]
[ [Loki, Josh, Mike, Jack], [Bob, Martin] ]
[ [Loki, Josh, Mike, Jack], [Martin, Bob] ]

Output format: (minimum number of tables, number of possible arrangements)

find_possible_arrangements(invited_guests_1, rivals_1) → {2, 8}

Additional Inputs:

invited_guests_2 = ["Bob", "Martin", "Jack", "Mike"]

rivals_2 = [
  ["Bob", "Martin"],    ["Bob", "Jack"]
]

find_possible_arrangements(invited_guests_2, rivals_2) → {1, 4}

Explanation:
[ [Bob, Mike, Martin, Jack] ]
[ [Bob, Mike, Jack, Martin] ]
[ [Martin, Jack, Mike, Bob] ]
[ [Jack, Martin, Mike, Bob] ]


invited_guests_3 = ["Bob", "Martin", "Jack", "Mike", "Josh", "Loki"]

rivals_3 = [
  ["Loki", "Martin"],    ["Bob", "Loki"],
  ["Mike", "Loki"],      ["Jack", "Josh"],
  ["Martin", "Josh"],    ["Martin", "Mike"],
  ["Bob", "Jack"],       ["Jack", "Loki"],
  ["Bob", "Josh"],       ["Martin", "Jack"],
  ["Bob", "Mike"],       ["Loki", "Josh"]
]

find_possible_arrangements(invited_guests_1, rivals_1) → {2, 8}
find_possible_arrangements(invited_guests_2, rivals_2) → {1, 4}
find_possible_arrangements(invited_guests_3, rivals_3) → {3, 24}

Complexity analysis variables:

N: invited guests
M: pairs of rivals

*/

const invited_guests_1 = ["Bob", "Martin", "Jack", "Mike", "Josh", "Loki"];

const rivals_1 = [
  ["Loki", "Martin"],
  ["Bob", "Loki"],
  ["Mike", "Loki"],
  ["Jack", "Josh"],
  ["Martin", "Josh"],
  ["Martin", "Mike"],
  ["Bob", "Jack"],
  ["Jack", "Loki"],
  ["Bob", "Josh"],
  ["Martin", "Jack"],
  ["Bob", "Mike"],
];

const invited_guests_2 = ["Bob", "Martin", "Jack", "Mike"];

const rivals_2 = [
  ["Bob", "Martin"],
  ["Bob", "Jack"],
];

const invited_guests_3 = ["Bob", "Martin", "Jack", "Mike", "Josh", "Loki"];

const rivals_3 = [
  ["Loki", "Martin"],
  ["Bob", "Loki"],
  ["Mike", "Loki"],
  ["Jack", "Josh"],
  ["Martin", "Josh"],
  ["Martin", "Mike"],
  ["Bob", "Jack"],
  ["Jack", "Loki"],
  ["Bob", "Josh"],
  ["Martin", "Jack"],
  ["Bob", "Mike"],
  ["Loki", "Josh"],
];

let tables = [];
let isTaken = [];
let solution = [];

const isValid = (combination, rivalMap) => {
  for (const table of combination) {
    const membersOfTable = table;
    const totalMember = membersOfTable.length;
    for (let i = 0; i < totalMember - 1; i++) {
      if (!rivalMap[membersOfTable[i]] && !rivalMap[membersOfTable[i + 1]])
        continue;
      if (
        rivalMap[membersOfTable[i]] &&
        rivalMap[membersOfTable[i]].includes(membersOfTable[i + 1])
      ) {
        return false;
      }
      if (
        rivalMap[membersOfTable[i + 1]] &&
        rivalMap[membersOfTable[i + 1]].includes(membersOfTable[i])
      ) {
        return false;
      }
    }
  }
  return true;
};

const getMemberCount = (tableCombination, members) => {
  let totalMember = 0;
  for (const table of tableCombination) {
    for (const member of table) {
      totalMember++;
    }
  }
  return totalMember === members.length ? true : false;
};

const generateCombination = (currentTable, rivalMap, members) => {
  if (getMemberCount(tables, members)) {
    if (isValid(tables, rivalMap)) {
      solution.push(tables);
    }
    return;
  }

  for (
    let tableNumber = currentTable;
    tableNumber < tables.length;
    tableNumber++
  ) {
    for (let memberIndex = 0; memberIndex < members.length; memberIndex++) {
      if (!isTaken[memberIndex]) {
        isTaken[memberIndex] = 1;
        tables[tableNumber].push(members[memberIndex]);
        generateCombination(tableNumber, rivalMap, members);
        isTaken[memberIndex] = 0;
        tables[tableNumber].pop();
      }
    }
  }
};

const findPossibleArrangements = (invitedGuests, rivals) => {
  isTaken = [];

  for (const member of invitedGuests) {
    isTaken.push(0);
  }

  const rivalMap = {};
  for (const rivalPair of rivals) {
    if (!rivalMap[rivalPair[0]]) {
      rivalMap[rivalPair[0]] = [];
    }
    if (!rivalMap[rivalPair[1]]) {
      rivalMap[rivalPair[1]] = [];
    }
    rivalMap[rivalPair[0]].push(rivalPair[1]);
    rivalMap[rivalPair[1]].push(rivalPair[0]);
  }

  for (let tableCount = 1; tableCount <= 3; tableCount++) {
    tables = [];
    solution = [];
    for (let tableItem = 0; tableItem < tableCount; tableItem++) {
      tables.push([]);
    }
    generateCombination(0, rivalMap, invitedGuests);
    if (solution.length) {
      return { tableCount, length: solution.length };
    }
  }
};

console.log(findPossibleArrangements(invited_guests_1, rivals_1));
console.log(findPossibleArrangements(invited_guests_2, rivals_2));
console.log(findPossibleArrangements(invited_guests_3, rivals_3));
