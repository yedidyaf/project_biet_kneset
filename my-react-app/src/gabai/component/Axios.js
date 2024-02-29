import Axios from 'axios';
import Cookies from 'js-cookie';

// ...

const axios = Axios.create({
  baseURL: 'http://localhost:4000/',
});
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.interceptors.request.use((config) => {
  const token = Cookies.get('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export default axios;
// עכשיו כל בקשה שתעשה עם `api` ישלח את ה-token ב-header של Authorization
