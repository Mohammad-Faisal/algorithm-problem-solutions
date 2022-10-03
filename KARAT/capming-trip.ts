// You are going on a camping trip, but before you leave you need to buy groceries. To optimize your time spent in the store, instead of buying the items from your shopping list in order, you plan to buy everything you need from one department before moving to the next.

// Given an unsorted list of products with their departments and a shopping list, return the time saved in terms of the number of department visits eliminated.

// Example: 
// products = [
//     ["Cheese",          "Dairy"],
//     ["Carrots",         "Produce"],
//     ["Potatoes",        "Produce"],
//     ["Canned Tuna",     "Pantry"],
//     ["Romaine Lettuce", "Produce"],
//     ["Chocolate Milk",  "Dairy"],
//     ["Flour",           "Pantry"],
//     ["Iceberg Lettuce", "Produce"],
//     ["Coffee",          "Pantry"],
//     ["Pasta",           "Pantry"],
//     ["Milk",            "Dairy"],
//     ["Blueberries",     "Produce"],
//     ["Pasta Sauce",     "Pantry"]
// ]

// list1 = ["Blueberries", "Milk", "Coffee", "Flour", "Cheese", "Carrots"]

// For example, buying the items from list1 in order would take 5 department visits, whereas your method would lead to only visiting 3 departments, a difference of 2 departments.

// Produce(Blueberries)->Dairy(Milk)->Pantry(Coffee/Flour)->Dairy(Cheese)->Produce(Carrots) = 5 department visits
// New: Produce(Blueberries/Carrots)->Pantry(Coffee/Flour)->Dairy(Milk/Cheese) = 3 department visits

// list2 = ["Blueberries", "Carrots", "Coffee", "Milk", "Flour", "Cheese"] => 2
// list3 = ["Blueberries", "Carrots", "Romaine Lettuce", "Iceberg Lettuce"] => 0
// list4 = ["Milk", "Flour", "Chocolate Milk", "Pasta Sauce"] => 2
// list5 = ["Cheese", "Potatoes", "Blueberries", "Canned Tuna"] => 0

// All Test Cases:
// shopping(products, list1) => 2
// shopping(products, list2) => 2
// shopping(products, list3) => 0
// shopping(products, list4) => 2
// shopping(products, list5) => 0

// Complexity Variable:
// n: number of products

// normal path -> the number of departments visited during the 
// shortened path -> The number of unique departments

const products = [
  ['Cheese',          'Dairy'],
  ['Carrots',         'Produce'],
  ['Potatoes',        'Produce'],
  ['Canned Tuna',     'Pantry'],
  ['Romaine Lettuce', 'Produce'],
  ['Chocolate Milk',  'Dairy'],
  ['Flour',           'Pantry'],
  ['Iceberg Lettuce', 'Produce'],
  ['Coffee',          'Pantry'],
  ['Pasta',           'Pantry'],
  ['Milk',            'Dairy'],
  ['Blueberries',     'Produce'],
  ['Pasta Sauce',     'Pantry']
];

const list1 = ['Blueberries', 'Milk', 'Coffee', 'Flour', 'Cheese', 'Carrots'];
const list2 = ['Blueberries', 'Carrots', 'Coffee', 'Milk', 'Flour', 'Cheese'];
const list3 = ['Blueberries', 'Carrots', 'Romaine Lettuce', 'Iceberg Lettuce'];
const list4 = ['Milk', 'Flour', 'Chocolate Milk', 'Pasta Sauce'];
const list5 = ['Cheese', 'Potatoes', 'Blueberries', 'Canned Tuna'];


const shopping = (products, list) => {
    const productDeptMap = {}
    const deptProductMap = {}
    
    for(const item of products){
      productDeptMap[item[0]] =item[1]
      deptProductMap[item[1]] =item[0]
    }
    
    const uniqueDepts = new Set();
    
    for(const item of list){
      uniqueDepts.add(productDeptMap[item])
    }
    
    const normalPath = [];
    
    let dept = '';
    
    for(const item of list){
      const currentDept = productDeptMap[item];
      
      if(currentDept !== dept) normalPath.push(currentDept)
      
      dept =currentDept;
    }
    
    return normalPath.length - uniqueDepts.size
    
    
}


// console.log(shopping(products , list1))
// console.log(shopping(products , list2))
// console.log(shopping(products , list3))

/**
 * You and your friends are driving to a Campground to go camping. Only 2 of you have cars, so you will be carpooling. 

Routes to the campground are linear, so each location will only lead to 1 location and there will be no loops or detours. Both cars will leave from their starting locations at the same time. The first car to pass someone's location will pick them up. If both cars arrive at the same time, the person can go in either car.

Roads are provided as a directed list of connected locations with the duration (in minutes) it takes to drive between the locations. 
[Origin, Destination, Duration it takes to drive]

Given a list of roads, a list of starting locations and a list of people/where they live, return a collection of who will be in each car upon arrival to the Campground.
------------------------------------------------------
Bridgewater--(30)-->Caledonia--(15)-->New Grafton--(5)-->Campground
                                       ^
Liverpool---(10)---Milton-----(30)-----^

roads1 = [
    ["Bridgewater", "Caledonia", "30"], <= The road from Bridgewater to Caledonia takes 30 minutes to drive.
    ["Caledonia", "New Grafton", "15"], 
    ["New Grafton", "Campground", "5"], 
    ["Liverpool", "Milton", "10"],
    ["Milton", "New Grafton", "30"]
]
starts1 = ["Bridgewater", "Liverpool"]
people1 = [
    ["Jessie", "Bridgewater"], ["Travis", "Caledonia"], 
    ["Jeremy", "New Grafton"], ["Katie", "Liverpool"]
]

Car1 path: (from Bridgewater): [Bridgewater(0, Jessie)->Caledonia(30, Travis)->New Grafton(45)->Campground(50)]
Car2 path: (from Liverpool): [Liverpool(0, Katie)->Milton(10)->New Grafton(40, Jeremy)->Campground(45)]

Output (In any order/format):
    [Jessie, Travis], [Katie, Jeremy]
--------------------------------------
Riverport->Chester->Campground
             ^
Halifax------^

roads2 = [["Riverport", "Chester", "40"], ["Chester", "Campground", "60"], ["Halifax", "Chester", "40"]]
starts2 = ["Riverport", "Halifax"]
people2 = [["Colin", "Riverport"], ["Sam", "Chester"], ["Alyssa", "Halifax"]]

Output (In any order/format):
    [Colin, Sam], [Alyssa] OR [Colin], [Alyssa, Sam]
----------------------------------------
Riverport->Bridgewater->Liverpool->Campground

roads3 = [["Riverport", "Bridgewater", "1"], ["Bridgewater", "Liverpool", "1"], ["Liverpool", "Campground", "1"]]
starts3_1 = ["Riverport", "Bridgewater"]
starts3_2 = ["Bridgewater", "Riverport"]
people3 = [["Colin", "Riverport"], ["Jessie", "Bridgewater"], ["Sam", "Liverpool"]]

Output (starts3_1/starts3_2):  [Colin], [Jessie, Sam] - (Cars can be in any order)
----------------------------------------
All Test Cases: (Cars can be in either order)
carpool(roads1, starts1, people1) => [Jessie, Travis], [Katie, Jeremy]
carpool(roads2, starts2, people2) => [Colin, Sam], [Alyssa] OR [Colin], [Alyssa, Sam]
carpool(roads3, starts3_1, people3) => [Colin], [Jessie, Sam]
carpool(roads3, starts3_2, people3) => [Jessie, Sam], [Colin]
----------------------------------------
Complexity Variable:
n = number of routes
 */



// Not implemented yet

/**
 * Create a map: [location] : {[car1]: time1 , [car2]: time2}
 */

const carPool = (roads , start , people) => {
  
  const roadMap = {};
  for(const item of roads){
    roadMap[item[0]] = {
      destination: item[1],
      distance: parseInt(item[2])
    }
  }
  
  const locationArrival = {};
  let location = start[0];
  let distance = 0;
  while(location!=='Campground'){
    locationArrival[location] = {
      car1 : distance
    }
    distance+=roadMap[location].distance
    location = roadMap[location].destination;
    
  }
  
  location = start[1];
  distance = 0;
  while(location!=='Campground'){
    locationArrival[location] = {
      ...locationArrival[location],
      car2 : distance
    }
    distance+=roadMap[location].distance
    location = roadMap[location].destination;
   
  }
  
  const car1People = []
  const car2People = []
  
  for(const member of people){
    const memberName = member[0];
    const memberLocation = member[1];
    
    const car1Distance = locationArrival[memberLocation]?.car1 ?? 99999;
    const car2Distance = locationArrival[memberLocation]?.car2 ?? 99999;
    
    if(car1Distance < car2Distance){
      car1People.push(memberName)
    }else{
      car2People.push(memberName)
    }
  }
  
  return [car1People , car2People]
}
const roads1 = [
  ['Bridgewater', 'Caledonia', '30'], ['Caledonia', 'New Grafton', '15'], 
  ['New Grafton', 'Campground', '5'], ['Liverpool', 'Milton', '10'],
  ['Milton', 'New Grafton', '30']
];
const starts1 = ['Bridgewater', 'Liverpool'];
const people1 = [
  ['Jessie', 'Bridgewater'], ['Travis', 'Caledonia'], 
  ['Jeremy', 'New Grafton'], ['Katie', 'Liverpool']
];

const roads2 = [['Riverport', 'Chester', '40'], ['Chester', 'Campground', '60'], ['Halifax', 'Chester', '40']];
const starts2 = ['Riverport', 'Halifax'];
const people2 = [['Colin', 'Riverport'], ['Sam', 'Chester'], ['Alyssa', 'Halifax']];

const roads3 = [['Riverport', 'Bridgewater', '1'], ['Bridgewater', 'Liverpool', '1'], ['Liverpool', 'Campground', '1']];
const starts3_1 = ['Riverport', 'Bridgewater'];
const starts3_2 = ['Bridgewater', 'Riverport'];
const people3 = [['Colin', 'Riverport'], ['Jessie', 'Bridgewater'], ['Sam', 'Liverpool']];

// console.log(carPool(roads1 , starts1 , people1))
// console.log(carPool(roads2, starts2, people2))
console.log(carPool(roads3, starts3_1, people3))
console.log(carPool(roads3, starts3_2, people3))

// carpool(roads3, starts3_1, people3) => [Colin], [Jessie, Sam]
// carpool(roads3, starts3_2, people3) => [Jessie, Sam], [Colin]



/*
You and your friends are planning the hike to your campsite but there are various attractions you would like to see along the way. You are trying to plan a route where you can see all of your desired attractions without walking the same trail twice.

Trails are listed by the attractions they connect, all trails are 2-way trails and there can be multiple trails between 2 places.

Given a list of trails and a list of desired attractions, return whether there is a path which starts at the Parking Lot and ends at the Campsite which visits all of the desired attractions without using the same trail twice.
===============================================================
Examples:
===============================================================

Liberty Lake    Frozen Ocean   Eel Weir
    |            |        |    |      |
Parking Lot------Beaver Dam----Campsite

trails1 = [
    ["Beaver Dam",  "Frozen Ocean"], # First trail between Beaver Dam/Frozen Ocean
    ["Beaver Dam",  "Frozen Ocean"], # Second trail between Beaver Dam/Frozen Ocean
    ["Parking Lot", "Beaver Dam"],
    ["Parking Lot", "Liberty Lake"],
    ["Beaver Dam",  "Campsite"],
    ["Eel Weir",  "Campsite"],
    ["Eel Weir",  "Campsite"],
]
attractions1_1 = ["Frozen Ocean"] => True
Path: Parking Lot->Beaver Dam->Frozen Ocean->Beaver Dam->Campsite 

attractions1_2 = ["Liberty Lake", "Beaver Dam"] => False
It is not possible to return from Liberty Lake so this path is not possible.

attractions1_3 = ["Eel Weir"] => True
Path: Parking Lot->Beaver Dam->Campsite->Eel Weir->Campsite
--------------------------------------------
                Liberty Lake
                |    |    |
Jeremy's Bay--Mason's Cabin--Parking Lot
      |                        |     
    Horseshoe Falls----Mills Falls----Eel Weir--Outdoor Theater--Campsite
                                             \                   /
                                              --Hardwood Forest-- 
trails2 = [
    ["Mason's Cabin", "Liberty Lake"],
    ["Parking Lot", "Mill Falls"],
    ["Mason's Cabin", "Jeremy's Bay"],
    ["Eel Weir", "Hardwood Forest"],
    ["Outdoor Theater", "Campsite"],
    ["Jeremy's Bay", "Horseshoe Falls"],
    ["Mason's Cabin", "Parking Lot"],
    ["Mason's Cabin", "Liberty Lake"],
    ["Mill Falls", "Horseshoe Falls"],
    ["Mill Falls", "Eel Weir"],
    ["Hardwood Forest", "Campsite"],
    ["Eel Weir", "Outdoor Theater"],
    ["Liberty Lake", "Mason's Cabin"]
]
attractions2_1 = ["Jeremy's Bay", "Mason's Cabin", "Outdoor Theater"] #=> True
attractions2_2 = ["Outdoor Theater", "Eel Weir", "Hardwood Forest"] #=> False
attractions2_3 = ["Liberty Lake"] #=> True
attractions2_4 = ["Horseshoe Falls", "Eel Weir"] #=> True

All Test Cases:
sightseeing(trails1, attractions1_1) => True
sightseeing(trails1, attractions1_2) => False
sightseeing(trails1, attractions1_3) => True
sightseeing(trails2, attractions2_1) => True
sightseeing(trails2, attractions2_2) => False
sightseeing(trails2, attractions2_3) => True
sightseeing(trails2, attractions2_4) => True

Complexity Variable:
n = number of trails
*/

const getTrailName= (start , end) => `${start}-${end}`


const dfs = (graph , trailCount , path , cur, end , result) => {
  path.push(cur);
  
  if(cur === end){
    result.push(path);
  }
  
  for(const neighbor of graph[cur]){
    if(trailCount[getTrailName(cur , neighbor)] > 0){
      const newTrailCount = { ...trailCount };
      newTrailCount[getTrailName(cur , neighbor)]--;
      newTrailCount[getTrailName(neighbor , cur)]--;
      dfs(graph , newTrailCount, [...path] , neighbor , end , result)
    }
  }
  return result;
  
}


const sightseeing = (trails , attraction) => {
  const graph = {};
  const trailCount ={};
  for(const item of trails){
    if(!graph[item[0]]) graph[item[0]] = new Set()
    if(!graph[item[1]]) graph[item[1]] = new Set()
    
    graph[item[0]].add(item[1])
    graph[item[1]].add(item[0])
    
    const forwardTrail = getTrailName(item[0] , item[1])
    const backwardTrail = getTrailName(item[1] , item[0])
    if(!trailCount[forwardTrail]) trailCount[forwardTrail] = 0;
    if(!trailCount[backwardTrail]) trailCount[backwardTrail] = 0;
    
    trailCount[forwardTrail]++;
    trailCount[backwardTrail]++;
  }

  const paths = dfs(graph , trailCount , [] , 'Parking Lot', 'Campsite' ,[])
  
  for(const path of paths){
    const seen = {};
    let isFound = true;
    
    for(const site of path){
      seen[site] = true;
    }
    for(const item of attraction){
      if(!seen[item]){
        isFound = false;
        break;
      }
    }
    if(isFound) return true;
  }
  return false;
}


const trails1 = [
  ['Beaver Dam',  'Frozen Ocean'],
  ['Beaver Dam',  'Frozen Ocean'],    
  ['Parking Lot', 'Beaver Dam'],
  ['Parking Lot', 'Liberty Lake'],
  ['Beaver Dam',  'Campsite'],
  ['Eel Weir',  'Campsite'],
  ['Eel Weir',  'Campsite'],
];
const attractions1_1 = ['Frozen Ocean'];
const attractions1_2 = ['Liberty Lake', 'Beaver Dam'];
const attractions1_3 = ['Eel Weir'];

const trails2 = [
  ['Mason\'s Cabin', 'Liberty Lake'],
  ['Parking Lot', 'Mill Falls'],
  ['Mason\'s Cabin', 'Jeremy\'s Bay'],
  ['Eel Weir', 'Hardwood Forest'],
  ['Outdoor Theater', 'Campsite'],
  ['Jeremy\'s Bay', 'Horseshoe Falls'],
  ['Mason\'s Cabin', 'Parking Lot'],
  ['Mason\'s Cabin', 'Liberty Lake'],
  ['Mill Falls', 'Horseshoe Falls'],
  ['Mill Falls', 'Eel Weir'],
  ['Hardwood Forest', 'Campsite'],
  ['Eel Weir', 'Outdoor Theater'],
  ['Liberty Lake', 'Mason\'s Cabin']
];
const attractions2_1 = ['Jeremy\'s Bay', 'Mason\'s Cabin', 'Outdoor Theater'];
const attractions2_2 = ['Outdoor Theater', 'Eel Weir', 'Hardwood Forest'];
const attractions2_3 = ['Liberty Lake'];
const attractions2_4 = ['Horseshoe Falls', 'Eel Weir'];

// console.log(sightseeing(trails1 , attractions1_1));
// console.log(sightseeing(trails1 , attractions1_2));
// console.log(sightseeing(trails1 , attractions1_3));
// console.log(sightseeing(trails2 , attractions2_1));
// console.log(sightseeing(trails2 , attractions2_2));
// console.log(sightseeing(trails2 , attractions2_3));
// console.log(sightseeing(trails2 , attractions2_4));
