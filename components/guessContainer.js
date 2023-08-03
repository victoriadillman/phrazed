import { IndividualGuess } from './individualGuess';

export function GuessContainer({ phrase }) {
  phrase = phrase.toUpperCase();
  return (
    <div>
      < IndividualGuess phrase={phrase}/>
      < IndividualGuess phrase={phrase}/>
      < IndividualGuess phrase={phrase}/>
      < IndividualGuess phrase={phrase}/>
      < IndividualGuess phrase={phrase}/>
    </div>
  )
}