import Axios from "axios";

export const axios = Axios.create({
  baseURL: "http://192.168.96.235:3000",
});
