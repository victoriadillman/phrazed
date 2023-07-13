import utilStyles from '../styles/utils.module.css';
import { forwardRef, useRef } from 'react';

export const Textbox = forwardRef(function Textbox({ letter, space, backspace, index, handleFocus }, ref) {
  const handleInputChange = (e) => {

    if (e.target.value.toUpperCase() === letter) {
      console.log('yay');
    } else {
      console.log('no');
    }
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
  };

  return (
    <input
      className={utilStyles.box}
      defaultValue=""
      maxLength={1}
      onChange={handleInputChange}
      onKeyDown={handleOnKeyDown}
      ref={ref}
      style={{textTransform: 'uppercase'}}
    />
  );
});