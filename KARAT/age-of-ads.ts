const counts = [
  "900,google.com",
  "60,mail.yahoo.com",
  "10,mobile.sports.yahoo.com",
  "40,sports.yahoo.com",
  "300,yahoo.com",
  "10,stackoverflow.com",
  "20,overflow.com",
  "5,com.com",
  "2,en.wikipedia.org",
  "1,m.wikipedia.org",
  "1,mobile.sports",
  "1,google.co.uk",
];

const countDomains = (counts) => {
  const result = {};
  for (const singleCount of counts) {
    const count = parseInt(singleCount.split(",")[0]);
    const domainParts = singleCount.split(",")[1].split(".").reverse();
    let running = "";

    for (const domain of domainParts) {
      if (result[running]) running = `${domain}.${running}`;
      else running = `${domain}`;
      if (result[running]) result[running] += count;
      else result[running] = count;
    }
  }
  return result;
};

// console.log(countDomains(counts))

// ====== problem 2 =======

const user0 = [
  "/start",
  "/green",
  "/blue",
  "/pink",
  "/register",
  "/orange",
  "/one/two",
];
const user1 = ["/start", "/pink", "/register", "/orange", "/red", "a"];
const user2 = ["a", "/one", "/two"];
const user3 = [
  "/pink",
  "/orange",
  "/yellow",
  "/plum",
  "/blue",
  "/tan",
  "/red",
  "/amber",
  "/HotRodPink",
  "/CornflowerBlue",
  "/LightGoldenRodYellow",
  "/BritishRacingGreen",
];
const user4 = [
  "/pink",
  "/orange",
  "/amber",
  "/BritishRacingGreen",
  "/plum",
  "/blue",
  "/tan",
  "/red",
  "/lavender",
  "/HotRodPink",
  "/CornflowerBlue",
  "/LightGoldenRodYellow",
];
const user5 = ["a"];
const user6 = [
  "/pink",
  "/orange",
  "/six",
  "/plum",
  "/seven",
  "/tan",
  "/red",
  "/amber",
];

const findMatchingLength = (history1, history2, index1, index2) => {
  const matchingArray = [];
  while (index1 < history1.length && index2 < history2.length) {
    if (history1[index1] !== history2[index2]) break;
    matchingArray.push(history1[index1]);
    index1++;
    index2++;
  }
  return matchingArray;
};

const longestMatchingHistory = (user1, user2) => {
  let result = [];
  for (let i = 0; i < user1.length; i++) {
    for (let j = 0; j < user2.length; j++) {
      if (user1[i] === user2[j]) {
        const currentPossibleMatch = findMatchingLength(user1, user2, i, j);
        if (currentPossibleMatch.length > result.length) {
          result = [...currentPossibleMatch];
        }
      }
    }
  }
  return result;
};

// console.log(longestMatchingHistory(user0 ,user0))
// ===== problem 3 ======

const completedPurchaseUsers = [
  "3123122444",
  "234111110",
  "8321125440",
  "99911063",
];

// "IP Address, timestamp, Ad text"
const adClicks = [
  "122.121.0.1,2016-11-03 11:41:19,Buy wool coats for your pets",
  "96.3.199.11,2016-10-15 20:18:31,2017 Pet Mittens",
  "122.121.0.250,2016-11-01 06:13:13,The Best Hollywood Coats",
  "82.1.106.8,2016-11-12 23:05:14,Buy wool coats for your pets",
  "92.130.6.144,2017-01-01 03:18:55,Buy wool coats for your pets",
  "122.121.0.155,2017-01-01 03:18:55,Buy wool coats for your pets",
  "92.130.6.145,2017-01-01 03:18:55,2017 Pet Mittens",
];

// "User ID, IP address"
const allUserIps = [
  "2339985511,122.121.0.155",
  "234111110,122.121.0.1",
  "3123122444,92.130.6.145",
  "39471289472,2001:0db8:ac10:fe01:0000:0000:0000:0000",
  "8321125440,82.1.106.8",
  "99911063,92.130.6.144",
];

// first build object addclick_ip

const checkIfIpPurchased = (ip: string) => {
  console.log(completedPurchaseUsers.includes(ip));
  const users_ip_id = {};
  for (const singleUserIp of allUserIps) {
    const ip = singleUserIp.split(",")[1];
    const userId = singleUserIp.split(",")[0];
    users_ip_id[ip] = userId;
  }
  return completedPurchaseUsers.includes(users_ip_id[ip]);
};

const countAddClicks = () => {
  const click_ip = {};
  for (const singleClick of adClicks) {
    const ip = singleClick.split(",")[0];
    const addText = singleClick.split(",")[2];
    if (!click_ip[addText]) click_ip[addText] = [];
    click_ip[addText].push(ip);
  }

  const result = {};
  Object.keys(click_ip).forEach((key) => {
    const totalCount = click_ip[key].length;
    let totalPurchase = 0;
    click_ip[key].forEach((singleIp) => {
      if (checkIfIpPurchased(singleIp)) totalPurchase++;
    });
    result[key] = {
      click: totalCount,
      purchase: totalPurchase,
    };
  });

  return result;
};
