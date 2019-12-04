import Axios from "axios";
const port = process.env.port || 3000;
export default Axios.create({baseURL: "http://localhost:" + port, crossdomain: true});