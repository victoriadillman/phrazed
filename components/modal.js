import Popup from 'reactjs-popup';
import { useState, useEffect } from 'react';
import utilStyles from '../styles/utils.module.css'

export function Modal({handleMainFocus}) {
  const [open, setOpen] = useState(false);
  // Find a way to call focus to first input
  const closeModal = () => {
    setOpen(false);
    handleMainFocus(0, false)
  }

  useEffect(() => {
    setOpen(true);
  },[])

  return (
    <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className={utilStyles.modal}>
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          {/* Welcome to Phrazed! Your friend sent you a phrase to guess. <br />You have six tries to guess what they sent you.
          <br />Green: The letter is in the right word and in the right space--nice!
          <br />Yellow: The letter is in the right word, wrong space--so close!
          <br />Purple: The letter is in the phrase but not the word--good try!
          <br />Gray: The letter is not in the phrase at all--goodbye to that letter! */}
          Babe!! A year ago today we became ~~~official~~~ as is written on the bagel pub take out bag you left at my apartment on October 9th, 2022.

<br/><br/>It`s been a year of (more) bagels and reality television and I love you`s and  cabin weekends and (even more) candy hearts. A year of easier introductions and being able to say “this is my partner” instead of “uhh um we`re like we`re seeing each other???” It`s been a year of growth, of #therapy, and so much goddamn trust. I love you and I love the adventure we`ve been on together. 

<br/><br/> BUT ALSO 

<br/><br/>it`s been THE year of PHRAZLES. We`ve made, between the two of us, 47 phrazles. It started with TWO PEAS IN A POD and YOU HAVE MY HEART. We`ve had some great ones since then: BUTTERFLIES IN MY STOMACH, EVERYONE LOVES BOOBS, and PARALLEL PARKING IS HARD. Our most recent cover some fabulous ground as well: I MISS MY GIRL, ITS FRIDAY IM IN LOVE, and NO WHERE TO GO BUT UP. 

<br/><br/>I love that we love puzzles and making puzzles for each other. Thanks to Vic(!!!), now we can do so without me cursing out google sheets every two seconds. 

<br/><br/>Happy Anniversary and happy phrazle-ing!!!
        </div>
      </Popup>
  );
}