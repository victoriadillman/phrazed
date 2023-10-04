export function check(str, arr) {
  const result = [];
  let wordCount = 0;
  const arrWords = str.split(' ');
  let success = true;
  for (let i = 0; i < arr.length; i++) {
    
    if (arr[i] === '') {
      console.log(arr[i], 'space', wordCount)
      wordCount ++;
      result.push('green')
    }

    else if (arr[i] === str[i]) {
      console.log(arr[i], 'green', wordCount)
      result.push('green');
    }
    else if (!str.includes(arr[i])) {
      console.log(arr[i], 'gray', arrWords, wordCount)
      result.push('gray');
      success = false;
    }
    // Getting error: edge case is 'wouldn't harm a fly' and entry is 'qqrewqasfdaagda'
    else if (arrWords[wordCount].includes(arr[i])) {
      console.log(arr[i], 'yellow', wordCount)
      result.push('yellow');
      success = false;
    }
    else {
      console.log(arr[i], 'purple', wordCount)
      result.push('purple');
      success = false;
      
    }
  }
  return [result, success];
}