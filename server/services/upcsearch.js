//This presets AXIOS with search to UPCItem.com
//const https = require("https");
const axios = require("axios");

module.exports = axios.create({
  baseURL: "https://api.upcitemdb.com/prod/trial",
  headers: {
    Accept: "application/json",
    "Content-Type": "text/plain"
  }
});

// {
//   hostname: 'api.upcitemdb.com',
//   path: '/prod/trial/lookup',
//   method: 'POST',
//   headers: {
//     "Content-Type": "application/json",
//     "user_key": "v1",
//     "key_type": "trial"
//   }
// });
// const req = https.request(opts, function(res) {
//   console.log('statusCode: ', res.statusCode);
//   console.log('headers: ', res.headers);
//   res.on('data', function(d) {
//     console.log('BODY: ' + d);
//   })
// })
// req.on('error', function(e) {
//   console.log('problem with request: ' + e.message);
// })
// req.write(`{ "upc": ${upcCode} }`)
// req.end()
