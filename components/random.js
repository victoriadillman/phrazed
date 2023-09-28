import { useState } from "react";
export function Random({handleSubmit}) {
  const [randomPhrase, setRandomPhrase] = useState('')

  const handleClick = async () => {
    const endpoint = '/api/aiCall-link';
    const response = await fetch(endpoint);
    const result = await response.json();
    setRandomPhrase(result);
    return;
  }
  
  return (
    <div>
      <button onClick={handleClick}
      >Can't think of a phrase? Click here to get a randomly generated one!</button>
      <p>{randomPhrase}</p>
    </div>
  )
}