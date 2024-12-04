const fs = require("fs");

function read(file) {
  const res = [];

  data = fs.readFileSync(file, "utf-8");
  rows = data.split("\n");
  rows.forEach(row => {
    const cols = row.split(" ");
    res.push(cols)
  });
  return res.slice(0, res.length - 1)
}

function isSafe(arr) {
  let status = (arr[0] - arr[1]) >= 0 ? 1 : -1;
  for (let i = 0; i < arr.length - 1; i++) {
    diff = arr[i] - arr[i + 1];
    safe = (diff * status) >= 1 && (diff * status) <= 3;
    if (!safe) {
      return [false, i];
    }
  }
  return [true, null];
}

function isSafewithDeletion(arr, idx) {
  let i = 0;
  while (i < arr.length - 1) {
    let newArr = arr.slice(0, idx).concat(arr.slice(idx + 1));
    console.log(arr, newArr)
    const [valid, newIdx] = isSafe(newArr);
    if (valid) {
      return true;
    }
    idx = newIdx;
    i++;
  }
  return false
}

// part 1
function redReport(arr) {
  let safeCnt = 0;
  arr.forEach(element => {
    const [valid, _] = isSafe(element);
    if (valid) {
      safeCnt++;
    }
  });
  return safeCnt;
}


// part 2
function dampener(arr) {
  let safeCnt = 0;
  arr.forEach(element => {
    const [valid, idx] = isSafe(element);
    if (valid || isSafewithDeletion(element, idx)) {
      safeCnt++
    }
  });
  return safeCnt
}


const arr = read("input_test.txt");
console.log("part 1: %d", redReport(arr));
console.log("part 2: %d", dampener(arr));
