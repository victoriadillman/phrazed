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
    const noAlphabet = new RegExp(/[^a-zA-Z]/)
    if (phrase[i] === ' ' || noAlphabet.test(phrase[i])) {
      letterArr.push('')
    }
    else {
      letterArr.push('no');
    }
    colorArr.push('white')
  }
  // VICTORIA - this needs to be moved over to ID
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
    } else if (rows.length === 0 && guessPoint === 0) {
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
          focusing={true}
        />
      )
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
          focusing={false}
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