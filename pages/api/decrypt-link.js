import CryptoJS from "crypto-js";

export default function handler(req, res) {
  const URL = req.body.URL;
  const decrypt = function(data) {
    try {
      const decodedData = decodeURIComponent(data)
      const result = CryptoJS.enc.Base64.parse(decodedData).toString(CryptoJS.enc.Utf8);
      return result;
    } catch (ex) {
      console.error('Error occurred during decryption:', ex, URL);
      return 'The sound of one hand clapping';
    }
  };
  const result = decrypt(URL);
  res.status(200).json({phrase: result})
}