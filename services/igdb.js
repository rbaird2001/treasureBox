const axios = require("axios")

module.exports = axios.create(
    {
        baseURL: "https://api-v3.igdb.com" ,
        headers:{
            "Accept" : "application/json",
            "user-key" :"232f73103bae48c5bc816211a0e4bc5a",
            'Content-Type': 'text/plain'
        },

    }
)