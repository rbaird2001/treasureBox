
//This presets AXIOS with search to igdb.com
const axios = require("axios")

module.exports = axios.create(
    {
        baseURL: "https://api-v3.igdb.com" ,
        headers:{
            "Accept" : "application/json",
            "user-key" : process.env.IGDB_KEY,
            'Content-Type': 'text/plain'
        },

    }
)