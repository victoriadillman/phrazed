import { Textbox } from './textbox';
import { Empty } from './empty'
import utilStyles from '../styles/utils.module.css';

export function GuessContainer(phrase) {

  // Pushing each letter into array for textbox generation
  const arrBox = [];
  let rows = []
  for(let i = 0; i < phrase.phrase.length; i++) {
    if (rows.length > 5 && phrase.phrase[i] === ' ') {
      arrBox.push(rows);
      rows = [];
    }
    else if (phrase.phrase[i] === ' ') {
      rows.push(<Empty key={'empty' + i} />)
    }
    else {
      rows.push(<Textbox letter={phrase.phrase[i]} key={i}/>)
    }
  }

  return (
    <div>
      {arrBox.map((row) => (
        <div className={utilStyles.grid}>
          {row}
        </div>
      ))}
      <div className={utilStyles.grid}>
          {rows}
      </div>
    </div>
  );
}