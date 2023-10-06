// import utilStyles from '../styles/utils.module.css';
import { forwardRef } from 'react';
import { check } from '../functions/checking';

export const Textbox = forwardRef(function Textbox(
  { phrase, space, backspace, index, objLetters, setObjLetters, objColors, setObjColors, testStyle, setEnable, isEnabled, guessPoint, handleMainFocus, focusing, keyboardLetter, setKeyboardLetter, setClassSuccess }, 
  ref) {

  const handleInputChange = (e) => {
    // Handling array for checking if argument is correct
    const newArr = [];
    objLetters[guessPoint].forEach((element, i) => {
      if (i === (index - (phrase.length * guessPoint))) newArr.push(e.target.value.toUpperCase());
      else newArr.push(element);
    });
    const copyObjLetters = objLetters;
    copyObjLetters[guessPoint] = newArr;
    setObjLetters(copyObjLetters);

    // Handling cursor movement
    if (space) {
      handleMainFocus(index + 2, false);
    }
    else {
      handleMainFocus(index + 1, false);
    }
  };

  // Handling typing inputs
  const handleOnKeyDown = event => {
    
    if (event.key === 'Backspace') {
      event.preventDefault(); 

      const value = event.target.value; 

      if (value === '') {
        if (backspace) {
          handleMainFocus(index - 2, true)
        }
        handleMainFocus(index - 1, true);
      } else { 
        event.target.value = '';
      }
    }
    if (event.key === 'Enter') {
      const noAlphabet = new RegExp(/[^a-zA-Z]/)
      if (objLetters[guessPoint].includes('no') || objLetters[guessPoint].some(letter => noAlphabet.test(letter))) {
        alert('invalid');
      } else {
        // checkResult returns array of new colors, and boolean of whether guess was right
        const checkResult = check(phrase, objLetters[guessPoint])
        // Updating colors
        const repeatObjColor = {...objColors};
        repeatObjColor[guessPoint] = checkResult[0];
        setObjColors(repeatObjColor);

        // Logic for keyboard colors
        const newKeyboardLetter = {};
        // Updating the new letters
        objLetters[guessPoint].forEach((curElem, i) => {
          newKeyboardLetter[curElem] = checkResult[0][i]
        });
        // filling in the remaining letter colors
        for (const key in keyboardLetter) {
          if (key in newKeyboardLetter) {
            continue;
          } else {
            newKeyboardLetter[key] = keyboardLetter[key]
          }
        };
        setKeyboardLetter(newKeyboardLetter);

        // Logic for yes vs no
        if (!checkResult[1]) {
          if (guessPoint === 5) {
            alert(`Nope, the phrase was ${phrase}`);
            setClassSuccess('fail')
          }
          else alert('nope');
          // Enable move
          setEnable(isEnabled => {
            const newEnable = [...isEnabled];
            newEnable[guessPoint] = false;
            newEnable[guessPoint + 1] = true;
            return newEnable;
          });
        }
        else {
          // Disable all moves
          setEnable(isEnabled => {
            const newEnable = [...isEnabled];
            newEnable[guessPoint] = false;
            return newEnable;
          });
          setClassSuccess('success')
        }
      }    
    }
  };

  return (
    <input
      className={testStyle}
      defaultValue=""
      maxLength={1}
      onChange={handleInputChange}
      onKeyDown={handleOnKeyDown}
      ref={ref}
      style={{textTransform: 'uppercase'}}
      pattern="^[a-zA-Z]+$"
      disabled={isEnabled[guessPoint] ? false : true}
      autoFocus={focusing}
    />
  );
});