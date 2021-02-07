export function makeSubArrays(arr) {
  let res = [];
  const max = 4;
  let curSet = [];

  for (let i = 0; i < arr.length; i++) {
    if (curSet.length < max && i !== arr.length - 1) {
      curSet.push(arr[i]);
    } else {
      if (i === arr.length - 1) {
        curSet.push(arr[i]);
      }
      res.push(curSet);
      curSet = [];
    }
  }
  return res;
}

export function checkIfWon(a) {
  for (let i = 0; i < a.length; i++) {
    if (a[i].includes("Jesus")) {
      let b = decodeURIComponent(a[i].split("_"));
      if (b.length === 1) {
        console.log(true)
        return true;
      }
    }
  }
  console.log(false)
  return false;
}
