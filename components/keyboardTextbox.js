export function KeyboardTextbox({letter, style, textStyle}){
  return (
    <div className={style}>
      <p className={textStyle}>{letter}</p>
    </div>
  )
}