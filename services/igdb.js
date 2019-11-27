const axios = require("axios")

module.exports = axios.create(
    {
        baseURL: "https://api-v3.igdb.com/" ,
        headers:{
            "Accept" : "application/json",
            "user-key" : process.env.IGDB_KEY,
        },

    }
)