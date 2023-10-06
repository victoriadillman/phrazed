import { forwardRef } from "react";

export const Entry = forwardRef(function Entry({handleSubmit}, ref) {
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
          ref={ref}
        />
        <button type="submit">Generate link</button>
      </form>
  )
})