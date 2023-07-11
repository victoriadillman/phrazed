export function URL({isURL}) {
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
      <p>Here is the link to send your friend:</p>
      <button className="btn" onClick={copyContent}>${isURL}</button>
    </div>
  )
}

