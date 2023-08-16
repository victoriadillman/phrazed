export function check(str, arr) {
  const result = [];
  let wordcount = 0;
  const arrWords = str.split(' ');

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === ' ') wordcount++;

    if (arr[i] === str[i]) {
      result.push('green');
    }
    else if (!str.includes(arr[i])) {
      result.push('red')
    }
    else if (arrWords[wordcount].includes(arr[i])) {
      result.push('purple')
    }
    else {
      result.push('yellow')
    }
  }
  return result;

  // going to return an array with color codes per index! To reassign to the indexes of our boxes
}