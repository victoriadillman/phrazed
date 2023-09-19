export function check(str, arr) {
  const result = [];
  let wordcount = 0;
  const arrWords = str.split(' ');
  let success = true;
  console.log(arr, str)
  for (let i = 0; i < arr.length; i++) {
    
    if (arr[i] === ' ') wordcount++;

    if (arr[i] === str[i]) {
      result.push('green');
    }
    else if (!str.includes(arr[i])) {
      result.push('red');
      success = false;
    }
    else if (arrWords[wordcount].includes(arr[i])) {
      result.push('purple');
      success = false;
    }
    else {
      result.push('yellow');
      success = false;
    }
  }
  return [result, success];

}