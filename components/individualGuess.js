import { Textbox } from './textbox';
import { Empty } from './empty'
import utilStyles from '../styles/utils.module.css';
import { useState } from 'react';

export function IndividualGuess({phrase, guessPoint, mainRef, handleMainFocus, isEnabled, setEnable}){
  const regex = new RegExp(/^[^a-zA-Z]*$/);

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
          index={i + (phrase.length * guessPoint)}
          arrLetters={arrLetters}
          setArrLetters={setArrLetters}
          setArrColors={setArrColors}
          testStyle={utilStyles[arrColors[i]]}
          ref={(el) => (mainRef.current[i + (phrase.length * guessPoint)] = el)}
          enabled={isEnabled[guessPoint]}
          setEnable={setEnable}
          isEnabled={isEnabled}
          guessPoint={guessPoint}
          handleMainFocus={handleMainFocus}
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