import axios from "axios";
import { HEROKU_URL } from "../constants";
export default axios.create({
  baseURL: HEROKU_URL, //"https://north-sails-server.herokuapp.com",
});
