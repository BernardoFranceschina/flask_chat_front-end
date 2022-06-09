import axios from "axios";
import { getToken } from "./token";

const URLdev = 'localhost'
const URL = window.location.hostname === '' ? '' : ''
const URLAplication = window.location.hostname === '' ? '' : ''
const URLSocket = window.location.hostname === '' ? '' : ''

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 401) {
    relocate()
  }
  if (error.response.status === 409) {
    relocate()
  }
  return Promise.reject(error)
});

function relocate() {
  if (window.location.hostname !== URLdev) {
    window.location = URLAplication
  }
}

class Api {
  static get(path) {
    return axios.get(`${URL}${path}`, this._getRequestOptions());
  }

  static post(path, body) {
    return axios.post(`${URL}${path}`, body, {
      headers: this._getHeaders()
    });
  }

  static put(path, body) {
    return axios.put(`${URL}${path}`, body, this._getRequestOptions());
  }

  static delete(path) {
    return axios.delete(`${URL}${path}`, this._getRequestOptions());
  }

  static _getRequestOptions(options = {}) {
    let requestOption = {};
    requestOption.headers = this._getHeaders(options.headers);
    return requestOption;
  }
  static _getHeaders() {
    let headers = {
      "Content-Type": "application/json"
    };
    return headers;
  }
  static headers() {
    return this._getHeaders();
  }
  static getApiUrl() {
    return URL;
  }
  static getAplicationUrl() {
    return URLAplication;
  }
  static getSocketUrl() {
    return URLSocket;
  }
}

export default Api;
export const API_URL = URL;