import { Textbox } from './textbox';
import { Empty } from './empty'
import utilStyles from '../styles/utils.module.css';
import { useEffect } from 'react';
import { useState } from 'react';

export function IndividualGuess({phrase, guessPoint, mainRef, handleMainFocus, isEnabled, setEnable, objLetters, setObjLetters, objColors, setObjColors}){
  const regex = new RegExp(/^[^a-zA-Z]*$/);
  const [resultRows, setResultRows] = useState([])
    
    useEffect(() => {
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
      const copyObjColor = objColors;
      const copyObjLetter = objLetters;
      copyObjColor[guessPoint] = colorArr;
      copyObjLetter[guessPoint] = letterArr;
      setObjColors(copyObjColor);
      setObjLetters(copyObjLetter);
    }, [])

    useEffect(() => {
      // Logic for the original delivery of rows
      let space = false;
      let backspace = false;
      const rows = []

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
              objLetters={objLetters}
              setObjLetters={setObjLetters}
              objColors={objColors}
              setObjColors={setObjColors}
              testStyle={utilStyles[objColors[guessPoint][i]]}
              ref={(el) => (mainRef.current[i + (phrase.length * guessPoint)] = el)}
              setEnable={setEnable}
              isEnabled={isEnabled}
              guessPoint={guessPoint}
              handleMainFocus={handleMainFocus}
              focusing={(rows.length === 0) ? true : false}
            />
          )
        } 
        space = false;
        backspace = false;
        setResultRows(rows);
      }
    }, [objColors])
    
  
  return (
    <div className={utilStyles.grid}>{resultRows}</div>
  )
}