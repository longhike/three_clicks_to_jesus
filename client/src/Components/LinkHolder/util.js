export function makeSubArrays(arr) {
  let res = [];
  const max = 4;
  let curSet = [];

  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
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
