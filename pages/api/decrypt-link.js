const CryptoJS = require('crypto-js')

export default function handler(req, res) {
  const URL = req.body.URL;
  const decrypt = function(data) {
    try {
      const result = CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
      return result;
    } catch (ex) {
      return 'The sound of one hand clapping'
    }
  }
  const result = decrypt(URL);
  res.status(200).json({phrase: result})
}