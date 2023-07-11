import { useState } from "react";

export function Entry({isGenerated, turnTrue, writeURL}) {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      phrase: event.target.phrase.value
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = '/api/generate-link';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)
    const result = await response.json();
    turnTrue();
    writeURL(result.urlAdd)
  }
  return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="phrase">Type phrase here: </label>
        <input
          type="text"
          id="phrase"
          name="phrase"
          required
          minLength='2'
          maxLength="50"
        />
        <br/>
        <br/>
        <button type="submit">Generate link</button>
      </form>
  )
}