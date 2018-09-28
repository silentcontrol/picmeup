import axios from 'axios';

const API_HOST = 'http://localhost:3001'
const API_NAMESPACE = '/owner'
const BASEURL = `${API_HOST}${API_NAMESPACE}`

const server = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
  headers:{
    'Content-type': 'application/vnd.api+json'
  }
});

function get(endpoint, data){
  return server.get(endpoint, data);
}

function patch(endpoint, data){
  return server.patch(endpoint, data);
}

const api = {
  get: get,
  patch: patch
};

export default api;