export function check(str, arr) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== str[i]) {
      result.push('red');
    }
    else {
      result.push('green')
    }
  }
  return result;

  // going to return an array with color codes per index! To reassign to the indexes of our boxes
}