// import utilStyles from '../styles/utils.module.css';
import { forwardRef } from 'react';
import { check } from '../functions/checking';

export const Textbox = forwardRef(function Textbox(
  { phrase, space, backspace, index, arrLetters, setArrLetters, setArrColors, testStyle, enabled, setEnable, isEnabled, guessPoint, handleMainFocus, focusing }, 
  ref) {

  const handleInputChange = (e) => {
    // Handling array for checking if argument is correct
    const newArr = [];
    arrLetters.forEach((element, i) => {
      if (i === (index - (phrase.length * guessPoint))) newArr.push(e.target.value.toUpperCase());
      else newArr.push(element);
    });
    setArrLetters(newArr);

    // Handling cursor movement
    if (space) {
      handleMainFocus(index + 2, false);
    }
    else {
      handleMainFocus(index + 1, false);
    }
  };

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
      if (arrLetters.includes('no') || arrLetters.some(letter => noAlphabet.test(letter))) {
        console.log('invalid');
      } else {
        // Victoria - this is kind of working BUT it keeps saying false, even when should be true
        const checkResult = check(phrase, arrLetters)
        setArrColors(checkResult[0]);
        if (!checkResult[1]) {
          alert('nope')
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
      title="Password should be digits (0 to 9) or alphabets (a to z)."
      disabled={enabled ? false : true}
      autoFocus={focusing}
    />
  );
});