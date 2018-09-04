import fetch from 'isomorphic-fetch';
import history from './history';
import { SESSION_STORAGE_KEY,PROFILE_STORAGE_KEY, CMS_BASE_URI_PROFILE, CMS_BASE_URI_GALATEA, CMS_BASE_URI_SAO } from './config';

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
        method: 'POST',
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
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(body),
      }).then(this.checkStatus)
        .then(this.parseJson)
  }

  getTasks() {
    const url = `${CMS_BASE_URI_GALATEA}/tasks`;
    return this._get(url).then((data) => data);
  }

  getTask(id) {
    const url = `${CMS_BASE_URI_GALATEA}/tasks/${id}?lang=es`;
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

    const url = `${CMS_BASE_URI_PROFILE}/register`;
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
    const url = `${CMS_BASE_URI_PROFILE}/user/extra`;
    return this._getWithToken(url).then((data) => data);
  }

  saveProfile(profile) {
    const url = `${CMS_BASE_URI_PROFILE}/user/extra`;
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

  /*
  * SAO Endopoints
  */
  submitEntry = (solvedTask, content, language) => {
    const task = {
      'contestSlug': solvedTask.contest.name,
      'ranked': false,
      'sources': [
        {
          'content': content,
          'encoding': 'utf-8',
          'language': language,
          'name': solvedTask.submissionFileFormats[0].filename
        }
      ],
      'taskSlug': solvedTask.name
    }

    const url = `${CMS_BASE_URI_SAO}/entries`;

    return this._postWithToken(url, task).then((data) => data);
  }

  retrieveResult = (id) => {
    const url = `${CMS_BASE_URI_SAO}/results/${id}`;
    return this._getWithToken(url).then((data) => data);
  }

  retrieveScore = (id) => {
    const url = `${CMS_BASE_URI_SAO}/scores/${id}`;
    return this._getWithToken(url).then((data) => data);
  }
f
}

export const client = new Client();