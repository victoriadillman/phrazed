
export function URL({isURL, style}) {
  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(isURL);
      alert('Successfully copied link!')
    } catch(err) {
      console.error('failed to copy: ', err)
    }
  }
  
  return (
    <div>
      <p>Click the URL to copy the link and send it to your friend:</p>
      <button onClick={copyContent}><p className={style} >${isURL}</p></button>
    </div>
  )
}

