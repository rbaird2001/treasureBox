import Axios from "axios";
const env = process.env.NODE_ENV;

const axios =
  env === "production"
    ? Axios.create({ baseURL: "/api" })
    : Axios.create({ baseURL: "http://localhost:3000/api", crossdomain: true });

export default axios;
