import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:4000/'
});

instance.defaults.headers.common['Content-Type'] = 'application/json';

export default instance;
