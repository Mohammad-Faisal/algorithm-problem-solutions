// javascript array sort for numbers = arr.sort((a , b) => a-b)
// initialize array with 0 -> const newArr = new Array(24).fill(0)
// create a set -> const newSet = new Set() -> set.add() set.has()

// problem 1
const logs1 = [
  ["58523", "user_1", "resource_1"],
  ["62314", "user_2", "resource_2"],
  ["54001", "user_1", "resource_3"],
  ["200", "user_6", "resource_5"],
  ["215", "user_6", "resource_4"],
  ["54060", "user_2", "resource_3"],
  ["53760", "user_3", "resource_3"],
  ["58522", "user_22", "resource_1"],
  ["53651", "user_5", "resource_3"],
  ["2", "user_6", "resource_1"],
  ["100", "user_6", "resource_6"],
  ["400", "user_7", "resource_2"],
  ["100", "user_8", "resource_6"],
  ["54359", "user_1", "resource_3"],
];

const logs2 = [
  ["300", "user_1", "resource_3"],
  ["599", "user_1", "resource_3"],
  ["900", "user_1", "resource_3"],
  ["1199", "user_1", "resource_3"],
  ["1200", "user_1", "resource_3"],
  ["1201", "user_1", "resource_3"],
  ["1202", "user_1", "resource_3"],
];

const logs3 = [["300", "user_10", "resource_5"]];

const initialValues = {
  min: 99999999,
  max: 0,
};

const getUserAccessTimes = (logs) => {
  const userAccessTimes: any = {};

  let userName;
  let accessTime;

  for (const sessionData of logs) {
    userName = sessionData[1];
    accessTime = parseInt(sessionData[0]);

    if (!userAccessTimes[userName]) {
      userAccessTimes[userName] = {
        min: 99999999,
        max: 0,
      };
    }

    if (accessTime < parseInt(userAccessTimes[userName].min)) {
      userAccessTimes[userName].min = accessTime;
    }
    if (accessTime > parseInt(userAccessTimes[userName].max)) {
      userAccessTimes[userName].max = accessTime;
    }
  }

  return userAccessTimes;
};

const checkIfWindowBreaks = (
  accessTimes: number[],
  leftIndex: number,
  rightIndex: number
) => {
  const difference = accessTimes[rightIndex] - accessTimes[leftIndex];
  return difference > 300;
};

const bringLeftIndexForward = (
  accessTimes: number[],
  currentLeft: number,
  currentRight: number
) => {
  let runningLeft = currentLeft;
  while (runningLeft <= currentRight) {
    if (!checkIfWindowBreaks(accessTimes, runningLeft, currentRight)) {
      break;
    }
    runningLeft++;
  }
  return runningLeft;
};

const findMaximumAccessInWindow = (accessTimes: number[]) => {
  let leftIndex = 0;
  let rightIndex = 0;

  const length = accessTimes.length;
  let maxCount = 0;

  while (rightIndex < length) {
    if (checkIfWindowBreaks(accessTimes, leftIndex, rightIndex)) {
      leftIndex = bringLeftIndexForward(accessTimes, leftIndex, rightIndex);
    }
    if (rightIndex - leftIndex + 1 > maxCount)
      maxCount = rightIndex - leftIndex + 1;
    rightIndex++;
  }
  return maxCount;
};

const getMaiximumAccessItems = (logs: Array<Array<string>>) => {
  const resourcesAccessTimes: any = {};

  for (const item of logs) {
    const resource = item[2];
    const time = parseInt(item[0]);
    if (!resourcesAccessTimes[resource]) resourcesAccessTimes[resource] = [];
    resourcesAccessTimes[resource].push(time);
  }

  let maxCount = 0;
  let maxAccessResource = "";

  for (const key of Object.keys(resourcesAccessTimes)) {
    const arrayOfAccessTimes = resourcesAccessTimes[key].sort((a, b) => a - b);
    const maxAccessCount = findMaximumAccessInWindow(arrayOfAccessTimes);

    if (maxAccessCount > maxCount) {
      maxCount = maxAccessCount;
      maxAccessResource = key;
    }
  }

  return { maxAccessResource, maxCount };
};

const buildTransitionGraph = (logs: Array<Array<string>>) => {
  const userToResourceMap = {};
  const resourceList = new Set();
  resourceList.add("__START__");

  for (const item of logs) {
    const time = parseInt(item[0]);
    const resource = item[2];
    const user = item[1];
    resourceList.add(resource);
    if (!userToResourceMap[user]) userToResourceMap[user] = [];
    userToResourceMap[user].push({ resource, time });
  }

  const result: any = {};

  for (const pontentialStart of resourceList) {
    result[pontentialStart.toString()] = {};

    if (pontentialStart === "__START__") {
      const counter = {};
      for (const key of Object.keys(userToResourceMap)) {
        const accessArray = userToResourceMap[key].sort(
          (a, b) => a.time - b.time
        );
        const firstResource = accessArray[0];
        if (!counter[firstResource.resource])
          counter[firstResource.resource] = 1;
        else counter[firstResource.resource] += 1;
      }
      let total = 0;
      let count = Object.keys(counter).length;
      for (const key of Object.keys(counter)) {
        total += counter[key];
      }

      for (const key of Object.keys(counter)) {
        result[pontentialStart][key] = counter[key] / total;
      }
    } else {
      const counter = {};
      for (const key of Object.keys(userToResourceMap)) {
        const accessArray = userToResourceMap[key].sort(
          (a, b) => a.time - b.time
        );
        const potentialPosition = accessArray.findIndex(
          (item) => item.resource === pontentialStart
        );
        if (potentialPosition === -1) continue;
        if (potentialPosition === accessArray.length - 1) {
          if (counter["__END__"]) counter["__END__"]++;
          else counter["__END__"] = 1;
        } else {
          const firstResource = accessArray[potentialPosition + 1];
          if (!counter[firstResource.resource])
            counter[firstResource.resource] = 1;
          else counter[firstResource.resource]++;
        }
      }
      let total = 0;
      let count = Object.keys(counter).length;
      for (const key of Object.keys(counter)) {
        total += counter[key];
      }

      for (const key of Object.keys(counter)) {
        result[pontentialStart.toString()][key] = counter[key] / total;
      }
    }
  }
  return result;
};
