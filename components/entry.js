import { forwardRef } from "react";
import utilStyle from '../styles/utils.module.css'

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
        <button className={utilStyle.buttonGenerate} type="submit"><p className={utilStyle.buttonText}>Generate link</p></button>
      </form>
  )
})