import Axios from "axios";
import Https from "https";

const httpsAgent = new Https.Agent({
  rejectUnauthorized: false,
});

export const axios = Axios.create({
  baseURL: process.env.API_VESTIBULAR_URL,
  httpsAgent: httpsAgent,
});
