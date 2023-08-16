import { Textbox } from './textbox';
import { Empty } from './empty'
import utilStyles from '../styles/utils.module.css';
import { useRef, useState } from 'react';

export function IndividualGuess({phrase, propKey}){
  const refs = useRef([]);
  const regex = new RegExp(/^[^a-zA-Z]*$/);


  // Logic for blocking input on enter
  const [enabled, setEnable] = useState(true);
 
  // Function for when user types in a letter
  const handleFocus = (nextIndex, backspace) => {
    console.log('in handleFocus ', propKey)
    if (nextIndex < refs.current.length && refs.current[nextIndex]) {
      const nextInput = refs.current[nextIndex];
      nextInput.focus();
      if (backspace) {
        nextInput.value = '';
      }
    }
    else if (nextIndex > refs.current.length || nextIndex < 0) {
      return;
    }
    else {
      if (backspace) {
        handleFocus(nextIndex - 1, true)
      }
      else {
        handleFocus(nextIndex + 1, false)
      }
    }
  };

  // Creating check letter logic (with colors)
  const letterArr = [];
  const colorArr = [];
  for (let i = 0; i < phrase.length; i++) {
    if (phrase[i] === ' ') {
      letterArr.push('')
    }
    else {
      letterArr.push('-');
    }
    colorArr.push('white')
  }
  const [arrLetters, setArrLetters] = useState(letterArr);
  const [arrColors, setArrColors] = useState(colorArr);
  
  // Logic for the original delivery of rows
  let rows = [];
  let space = false;
  let backspace = false;
  for (let i = 0; i < phrase.length; i++) {

    // Logic for spacing
    if (regex.test(phrase[i + 1])) {
      space = true;
    }
    if (regex.test(phrase[i - 1])) {
      backspace = true;
    }

    // Logic for words
    if (regex.test(phrase[i])) {
      rows.push(<Empty key={'empty' + i} letter={phrase[i]}/>); 
    } else {
      rows.push(
        <Textbox
          phrase={phrase}
          space={space}
          backspace={backspace}
          key={i}
          index={i * propKey}
          propKey={propKey}
          handleFocus={handleFocus}
          arrLetters={arrLetters}
          setArrLetters={setArrLetters}
          setArrColors={setArrColors}
          testStyle={utilStyles[arrColors[i]]}
          ref={(el) => (refs.current[i * propKey] = el)}
          enabled={enabled}
          setEnable={setEnable}
        />
      )
    }
    space = false;
    backspace = false;
  }

  return (
    <div className={utilStyles.grid}>{rows}</div>
  )
}