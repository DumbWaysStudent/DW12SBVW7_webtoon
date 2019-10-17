import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.1.51:3000/api/v1',
  // baseURL: 'https://547c8af5.ngrok.io/api/v1'
});

export default instance;