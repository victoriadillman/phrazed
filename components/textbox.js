import utilStyles from '../styles/utils.module.css';
import { forwardRef, useEffect } from 'react';

export const Textbox = forwardRef(function Textbox({ letter, space, index, handleFocus }, ref) {
  const handleInputChange = (e) => {
    if (e.target.value === letter) {
      console.log('yay');
    } else {
      console.log('no');
    }
    if (space) {
      handleFocus(index + 2);
    }
    else {
      handleFocus(index + 1); 
    }
  };

  return (
    <input
      className={utilStyles.box}
      defaultValue=""
      maxLength={1}
      onChange={handleInputChange}
      ref={ref}
    />
  );
});
