import { Textbox } from './textbox';
import { Empty } from './empty'
import utilStyles from '../styles/utils.module.css';
import { useEffect } from 'react';

export function IndividualGuess({phrase, guessPoint, mainRef, handleMainFocus, isEnabled, setEnable, objLetters, setObjLetters, objColors, setObjColors}){
  const regex = new RegExp(/^[^a-zA-Z]*$/);

  // Creating check letter logic (with colors)
  useEffect(() => {
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
    console.log(objColors[guessPoint][0])
  }, []);
  
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
          objLetters={objLetters}
          setObjLetters={setObjLetters}
          objColors={objColors}
          setObjColors={setObjColors}
          testStyle={objColors[guessPoint] === undefined ? utilStyles['white'] : utilStyles[objColors[guessPoint][i]]}
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
          objLetters={objLetters}
          setObjLetters={setObjLetters}
          objColors={objColors}
          setObjColors={setObjColors}
          testStyle={objColors[guessPoint] === undefined ? utilStyles['white'] : utilStyles[objColors[guessPoint][i]]}
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