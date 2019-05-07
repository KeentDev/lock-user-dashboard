import axios from 'axios';

const base_server_ip = 'localhost';
const server_port = '2000';
let token;

axios.defaults.baseURL = `http://${base_server_ip}:${server_port}/`;

axios.interceptors.request.use(function (config) {
  try {
    token = localStorage.getItem('token');
  } catch (error) {
    token = '';
  }
  
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default axios