import utilStyles from '../styles/utils.module.css';

export function Textbox(letter) {

  return (
      <input className={utilStyles.box} defaultValue='' maxLength={1} onChange={e => {
        if (e.target.value === letter.letter) {
          console.log('yay');
        }
        else {
          console.log('no');
        }
      }}/>
  )
}