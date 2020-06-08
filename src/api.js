import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:8000/",
  baseURL: "http://mepcoquizapp.southeastasia.cloudapp.azure.com:8000/",
  headers: {},
});

export default API;
