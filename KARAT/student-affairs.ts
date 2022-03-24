const studentCoursePairs1 = [
  ["58", "Linear Algebra"],
  ["94", "Art History"],
  ["94", "Operating Systems"],
  ["17", "Software Design"],
  ["58", "Mechanics"],
  ["58", "Economics"],
  ["17", "Linear Algebra"],
  ["17", "Political Science"],
  ["94", "Economics"],
  ["25", "Economics"],
  ["58", "Software Design"],
];

const studentCoursePairs2 = [
  ["0", "Advanced Mechanics"],
  ["0", "Art History"],
  ["1", "Course 1"],
  ["1", "Course 2"],
  ["2", "Computer Architecture"],
  ["3", "Course 1"],
  ["3", "Course 2"],
  ["4", "Algorithms"],
];

const studentCoursePairs3 = [
  ["23", "Software Design"],
  ["3", "Advanced Mechanics"],
  ["2", "Art History"],
  ["33", "Another"],
];

const findCommonCourses = (firstArray, secondArray: string[]) => {
  const commonSubjects = [];

  for (let i = 0; i < firstArray.length; i++) {
    const currentSubject = firstArray[i];
    if (secondArray.includes(currentSubject))
      commonSubjects.push(currentSubject);
  }

  return commonSubjects;
};

const findPairs = (studentPairs: string[][]) => {
  const studentIdList = new Set<string>();
  const studentCoursesMap = {};

  for (let i = 0; i < studentPairs.length; i++) {
    const studentId = studentPairs[i][0];
    studentIdList.add(studentId);
    if (!studentCoursesMap[studentId]) {
      studentCoursesMap[studentId] = [];
    }
    studentCoursesMap[studentId].push(studentPairs[i][1]);
  }

  const result = {};

  for (let i = 0; i < studentIdList.size; i++) {
    for (let j = i + 1; j < studentIdList.size; j++) {
      if (i !== j) {
        const firstStudent: string = [...studentIdList][i];
        const secondStudent: string = [...studentIdList][j];
        console.log(firstStudent, secondStudent);
        const commonCourses = findCommonCourses(
          studentCoursesMap[firstStudent],
          studentCoursesMap[secondStudent]
        );

        result[`${firstStudent},${secondStudent}`] = commonCourses;
      }
    }
  }

  return result;
};

// console.log(findPairs(studentCoursePairs1))

const prereqsCourses1 = [
  ["Foundations of Computer Science", "Operating Systems"],
  ["Data Structures", "Algorithms"],
  ["Computer Networks", "Computer Architecture"],
  ["Algorithms", "Foundations of Computer Science"],
  ["Computer Architecture", "Data Structures"],
  ["Software Design", "Computer Networks"],
];

const prereqsCourses2 = [
  ["Algorithms", "Foundations of Computer Science"],
  ["Data Structures", "Algorithms"],
  ["Foundations of Computer Science", "Logic"],
  ["Logic", "Compilers"],
  ["Compilers", "Distributed Systems"],
];

const prereqsCourses3 = [["Data Structures", "Algorithms"]];
const sourceCourses = (pre: string[][]) => {
  const courseSet = new Set<string>();

  for (let i = 0; i < pre.length; i++) {
    courseSet.add(pre[i][0]);
    courseSet.add(pre[i][1]);
  }
  // create an object that wil track if any course appeared on the right side.

  const coursesAtEnd = {};

  for (const item of [...courseSet]) {
    coursesAtEnd[item] = 0;
  }
  const courseGraph = {};

  for (let i = 0; i < pre.length; i++) {
    coursesAtEnd[pre[i][1]] = 1;
    courseGraph[pre[i][0]] = pre[i][1];
  }

  let startCourse = "";

  for (const item of [...courseSet]) {
    if (coursesAtEnd[item] === 0) {
      startCourse = item;
    }
  }

  const finalCoursesArray = [];

  while (courseGraph[startCourse]) {
    finalCoursesArray.push(startCourse);
    startCourse = courseGraph[startCourse];
  }
  const totalNumberOfCourses =
    finalCoursesArray.length % 2 == 0
      ? finalCoursesArray.length - 1
      : finalCoursesArray.length;
  const index = Math.floor(totalNumberOfCourses / 2);

  return finalCoursesArray[index];
};

// console.log(sourceCourses(prereqsCourses2))

const allCourses1 = [
  ["Logic", "COBOL"],
  ["Data Structures", "Algorithms"],
  ["Creative Writing", "Data Structures"],
  ["Algorithms", "COBOL"],
  ["Intro to Computer Science", "Data Structures"],
  ["Logic", "Compilers"],
  ["Data Structures", "Logic"],
  ["Graphics", "Networking"],
  ["Networking", "Algorithms"],
  ["Creative Writing", "System Administration"],
  ["Databases", "System Administration"],
  ["Creative Writing", "Databases"],
  ["Intro to Computer Science", "Graphics"],
];

const allCourses2 = [
  ["Course_3", "Course_7"],
  ["Course_0", "Course_1"],
  ["Course_1", "Course_2"],
  ["Course_2", "Course_3"],
  ["Course_3", "Course_4"],
  ["Course_4", "Course_5"],
  ["Course_5", "Course_6"],
];

let globalPaths: string[][] = [];
let courseGraph = {};

const dfs = (currentNode: string, path: string[]) => {
  path.push(currentNode);
  if (!courseGraph[currentNode] || courseGraph[currentNode].length == 0) {
    const newPath = [...path];
    globalPaths.push(newPath);
  } else {
    for (const nextCourse of courseGraph[currentNode]) {
      dfs(nextCourse, path);
    }
  }
  path.pop();
};

const getMiddleCourse = (
  courseGraph: { [key: string]: string },
  startCourse: string
) => {
  const finalCoursesArray = [];

  while (courseGraph[startCourse]) {
    finalCoursesArray.push(startCourse);
    startCourse = courseGraph[startCourse];
  }
  const totalNumberOfCourses = finalCoursesArray.length;
  const index = Math.floor(totalNumberOfCourses / 2);
  return finalCoursesArray[index];
};

const findTracks = (allCourses: string[][]) => {
  const eligibleAsStartCourse = {};

  for (let i = 0; i < allCourses.length; i++) {
    const pre = allCourses[i][0];
    const post = allCourses[i][1];
    eligibleAsStartCourse[post] = 0;
    if (eligibleAsStartCourse[pre] !== 0) {
      eligibleAsStartCourse[pre] = 1;
    }
    if (!courseGraph[pre]) courseGraph[pre] = [];
    courseGraph[pre].push(post);
  }
  for (const key in courseGraph) {
    if (key && eligibleAsStartCourse[key]) dfs(key, []);
  }
  const result = new Set<string>();
  for (const singlePath of globalPaths) {
    let arrayLength = singlePath.length;
    if (arrayLength % 2 == 0) arrayLength--;
    result.add(singlePath[Math.floor(arrayLength / 2)]);
  }
  return result;
};
