import Popup from 'reactjs-popup';
import { useState, useEffect } from 'react';
import utilStyles from '../styles/utils.module.css'

export function Modal({}) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  useEffect(() => {
    setOpen(true);
  },[])

  return (
    <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className={utilStyles.modal}>
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          Welcome to Phrazed! Your friend sent you a phrase to guess. <br />You have six tries to guess what they sent you.
          <br />Green: The letter is in the right word and in the right space--nice!
          <br />Yellow: The letter is in the right word, wrong space--so close!
          <br />Purple: The letter is in the phrase but not the word--good try!
          <br />Gray: The letter is not in the phrase at all--goodbye to that letter!
        </div>
      </Popup>
  );
}