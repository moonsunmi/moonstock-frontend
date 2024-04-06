import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  params: {
    serviceKey: process.env.NEXT_PUBLIC_API_SERVICE_KEY,
    resultType: "json",
    numOfRows: 1,
  },
});
export default instance;
