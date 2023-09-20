export function check(str, arr) {
  const result = [];
  let wordcount = 0;
  const arrWords = str.split(' ');
  let success = true;
  for (let i = 0; i < arr.length; i++) {
    
    if (arr[i] === '') {
      wordcount++;
      result.push('green')
    }

    else if (arr[i] === str[i]) {
      result.push('green');
    }
    else if (!str.includes(arr[i])) {
      result.push('gray');
      success = false;
    }
    else if (arrWords[wordcount].includes(arr[i])) {
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