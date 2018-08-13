import fetch from 'isomorphic-fetch';
import history from './history';

//const CMS_BASE_URI = 'http://localhost:8080/app/api';
const CMS_BASE_URI_PROFILE = 'http://localhost:8080/cmsusers/api/v1';
const CMS_BASE_URI_GALATEA = 'http://localhost:8081/galatea/v1';

const SESSION_STORAGE_KEY = 'access_token';
const PROFILE_STORAGE_KEY = 'profile';

class Client {

  loggedIn = true;

  _getWithToken(url) {
    return fetch(url, {
        method: 'GET',
        headers: {
           'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        }
      }).then(this.checkStatus)
        .then(this.parseJson)
  }

  _get(url) {
    return fetch(url, {
        method: 'GET',
        headers: {
           'Content-Type': 'application/json'
        }
      }).then(this.checkStatus)
        .then(this.parseJson)
  }

  _postWithToken(url, body) {
    return fetch(url, {
        method: 'post',
        headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${this.token}`
         },
         body: JSON.stringify(body),
      }).then(this.checkStatus)
        .then(this.parseJson)
  }

  _post(url, body) {
    return fetch(url, {
        method: 'post',
        headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(body),
      }).then(this.checkStatus)
        .then(this.parseJson)
  }

  getTasks() {
    const url = CMS_BASE_URI_GALATEA + '/tasks';
    return this._get(url).then((data) => data);
  }

  getTask(id) {
    const url = CMS_BASE_URI_GALATEA + `/tasks/${id}?lang=es`;
    return this._get(url).then((data) => data);
  }

  checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = {};
      //const error = new Error(`HTTP Error ${response.statusText}`);
      error.status = response.statusText;
      error.response = response;
      throw error;
    }
  }

  parseJson(response) {
    return response.json();
  }

  login = (token) => {
    this.token = token;

    const url = CMS_BASE_URI_PROFILE + '/register';
    return this._getWithToken(url).then((user) => {
      if (!user.error) {
        localStorage.setItem(SESSION_STORAGE_KEY, token);
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(user));
        this.profile = user;
        history.replace('/#');
      }
    });
  }

  getProfile() {
    const url = CMS_BASE_URI_PROFILE + '/user/extra';
    return this._getWithToken(url).then((data) => data);
  }

  saveProfile(profile) {
    const url = CMS_BASE_URI_PROFILE + '/user/extra';
    return this._postWithToken(url, profile).then((data) => data);
  }

  logout = () => {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    history.push('/#/login');
  }

  isAuthenticated = () => {
    this.token = localStorage.getItem(SESSION_STORAGE_KEY);
    this.profile = JSON.parse(localStorage.getItem(PROFILE_STORAGE_KEY));
    return this.loggedIn && this.token;
  }

  getCredentials = () => {
    return new Promise(function(r){ r(this.token); });
  }

}

export const client = new Client();