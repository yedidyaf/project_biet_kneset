import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:5050/'
});

instance.defaults.headers.common['Content-Type'] = 'application/json';

export default instance;
