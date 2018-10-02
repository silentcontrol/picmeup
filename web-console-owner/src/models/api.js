import axios from 'axios';

const API_HOST = 'http://localhost:3001' //'http://www.toqianren.com'
const API_NAMESPACE = '/owner'
const BASEURL = `${API_HOST}${API_NAMESPACE}`

const server = axios.create({
  baseURL: BASEURL,
  timeout: 10000
});

function get(endpoint, data){
  return server.get(endpoint, data);
}

function post(endpoint, data){
  return server.post(endpoint, data);
}

const api = {
  get: get,
  post: post
};

export default api;