const CryptoJS = require('crypto-js')

export default function handler(req, res) {
  const phrase = req.body.phrase;

  const encrypt = (text) => {
    const encryptedText =  CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
    return encodeURIComponent(encryptedText)
  }
  const result = encrypt(phrase);
  res.status(200).json({urlAdd: `http://localhost:3000/guess/${result}`})
}