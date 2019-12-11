
//React client uses axios to retreive data from server's Express Router
//Express processes the searches and returns results to React.
import Axios from "axios";
const env = process.env.NODE_ENV;

//Axios connection to server differs if production or dev.
const axios =
  env === "production"
    ? Axios.create({ baseURL: "/api" })
    : Axios.create({ baseURL: "http://localhost:3000/api", crossdomain: true });

export default axios;
