const fs = require('fs');

function read(file) {
  const arr1 = [];
  const arr2 = [];

  data = fs.readFileSync(file, "utf-8");
  rows = data.split("\n");
  rows.forEach(row => {
    const cols = row.split("   ");
    arr1.push(parseInt(cols[0]));
    arr2.push(parseInt(cols[1]));
  });

  arr1.sort();
  arr2.sort();

  return [arr1, arr2]
}

// Part 1
function compare(arr1, arr2) {
  let sum = 0;
  for (let i = 0; i < arr1.length - 1; i++) {
    val = Math.abs(arr1[i] - arr2[i]);
    sum += val;
  }
  return sum;
}

// Part 2
/**
  * similaryScore assumes both arguments are sorted
  */
function similaryScore(arr1, arr2) {
  let leftPointer = 0;
  let rightPointer = 0;
  let sum = 0;

  let found = 0;
  while (leftPointer < arr1.length && rightPointer < arr2.length) {
    let refVal = arr1[leftPointer];
    if (refVal == arr2[rightPointer]) {
      found++;
      rightPointer++;
      sum += refVal;
    } else if (refVal > arr2[rightPointer]) {
      rightPointer++;
    } 
    else {
      leftPointer++;
      while (arr1[leftPointer] == refVal) {
        sum += refVal * found;
        refVal == arr1[leftPointer];
        leftPointer++;
      }
      found = 0;
    }
  }
  return sum


}

const [arr1, arr2] = read("input.txt");
const firstArr = arr1.slice(0, arr1.length);
const secondArr = arr2.slice(0, arr1.length);
sum = compare(firstArr, secondArr)
let score = similaryScore(firstArr, secondArr);
console.log(score);
