import axios from "axios";

const URL = 'http://127.0.0.1:5000'
const URLSocket = 'http://127.0.0.1:5000'


class Api {
  static get(path) {
    return axios.get(`${URL}${path}`, this._getHeaders());
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
  static getSocketUrl() {
    return URLSocket;
  }
}

export default Api;