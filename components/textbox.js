// import utilStyles from '../styles/utils.module.css';
import { forwardRef } from 'react';
import { check } from '../functions/checking';

export const Textbox = forwardRef(function Textbox(
  { phrase, space, backspace, index, objLetters, setObjLetters, objColors, setObjColors, testStyle, enabled, setEnable, isEnabled, guessPoint, handleMainFocus, focusing }, 
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
        console.log('invalid');
      } else {
        const checkResult = check(phrase, objLetters[guessPoint])
        console.log('here is result of calling checkResult', checkResult);
        const repeatObjColor = objColors;
        objColors[guessPoint] = checkResult[0]
        setObjColors(repeatObjColor);
        if (!checkResult[1]) {
          alert('nope')
        }
        else {
          alert('yeah boi')
        }
        // Enable move
        const newEnable = [];
        for (let i = 0; i < isEnabled.length; i++) {
          if (i === (guessPoint + 1)) {
            newEnable.push(true)
          } else newEnable.push(false)
        }
        setEnable(newEnable);
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
      disabled={enabled ? false : true}
      autoFocus={focusing}
    />
  );
});