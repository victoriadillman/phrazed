import utilStyles from '../styles/utils.module.css';
import { forwardRef, useRef } from 'react';
import { check } from '../functions/checking';

export const Textbox = forwardRef(function Textbox({ phrase, space, backspace, index, handleFocus, arrLetters, setArrLetters, setArrColors, testStyle }, ref) {
  const handleInputChange = (e) => {
    // Handling array for checking if argument is correct
    const newArr = [];
    arrLetters.forEach((element, i) => {
      if (i === index) newArr.push(e.target.value.toUpperCase());
      else newArr.push(element);
    });
    setArrLetters(newArr);

    // Handling cursor movement
    if (space) {
      handleFocus(index + 2, false);
    }
    else {
      handleFocus(index + 1, false);
    }
  };

  const handleOnKeyDown = event => {
    
    if (event.key === 'Backspace') {
      event.preventDefault(); 
      console.log('delete')

      const value = event.target.value; 

      if (value === '') {
        if (backspace) {
          handleFocus(index - 2, true)
        }
          handleFocus(index - 1, true);
      } else {
        event.target.value = '';
      }
    }
    if (event.key === 'Enter') {
      console.log(arrLetters)
      setArrColors(check(phrase, arrLetters))
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
    />
  );
});