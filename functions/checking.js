export function check(str, arr) {
  const result = [];
  let wordCount = 0;
  const arrWords = str.split(' ');
  let success = true;
  for (let i = 0; i < arr.length; i++) {
    
    if (arr[i] === "punc") {
      result.push('green');
    }
    else if (arr[i] === '') {
      wordCount++;
      result.push('green')
    }
    else if (arr[i] === str[i]) {
      result.push('green');
    }
    else if (!str.includes(arr[i])) {
      result.push('gray');
      success = false;
    }
    else if (arrWords[wordCount].includes(arr[i])) {
      result.push('yellow');
      success = false;
    }
    else {
      result.push('purple');
      success = false;
      
    }
  }
  return [result, success];
}