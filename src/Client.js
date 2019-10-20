import fetch from 'isomorphic-fetch';
import history from './history';
import {  
          SESSION_STORAGE_KEY,
          PROFILE_STORAGE_KEY,
          CMS_BASE_URI_PROFILE, 
          CMS_BASE_URI_GALATEA, 
          CMS_BASE_URI_SAO } from './config';

class Client {

  loggedIn = true;

  _getWithToken(url, accept = 'application/json') {
    return fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': accept,
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        }
      }).then(this.checkStatus)
        .then(this.parseJson)
  }

  _get(url) {
    return fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
      }).then(this.checkStatus)
        .then(this.parseJson)
  }

  _postWithToken(url, body, accept = 'application/json') {
    return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': accept,
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
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
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

    const url = `${CMS_BASE_URI_PROFILE}/auth/register`;
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
    const url = `${CMS_BASE_URI_PROFILE}/users/extra`;
    return this._getWithToken(url).then((data) => data);
  }

  saveProfile(profile) {
    const url = `${CMS_BASE_URI_PROFILE}/users/extra`;
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
      'token': true,
      'sources': [
        {
          'content': content,
          'fileid': solvedTask.submissionFileFormats[0].filename,
          'name': solvedTask.submissionFileFormats[0].filename.replace("%l", solvedTask.submissionFileFormats[0].extension),
          'language': language
        }
      ],
      'taskSlug': solvedTask.name
    }

    const url = `${CMS_BASE_URI_SAO}/submit-entry`;
    const contentType = 'application/vnd.com.jossemargt.sao.entry-submit-transaction+json';
    return this._postWithToken(url, task, contentType).then((data) => data);
  }

  retrieveEntrySubmitTrx = (url) => {
    const completeUrl = `${CMS_BASE_URI_SAO}${url}`;
    const contentType = 'application/vnd.com.jossemargt.sao.entry-submit-transaction+json';
    return this._getWithToken(completeUrl, contentType).then((data) => data);
  }

  retrieveEntryTrx = (url) => {
    const completeUrl = `${CMS_BASE_URI_SAO}${url}`;
    const contentType = 'application/vnd.com.jossemargt.sao.entry+json';
    return this._getWithToken(completeUrl, contentType).then((data) => data);
  }

  retrieveEntryResult = (url) => {
    const completeUrl = `${CMS_BASE_URI_SAO}${url}`;
    const contentType = 'application/vnd.com.jossemargt.sao.result+json';
    return this._getWithToken(completeUrl, contentType).then((data) => data);
  }

  /* Drafts */

  submitDraft = (solvedTask, content, language, draftInput) => {
    const task = {
      'contestSlug': solvedTask.contest.name,
      'token': true,
      'sources': [
        {
          'content': content,
          'fileid': solvedTask.submissionFileFormats[0].filename,
          'name': solvedTask.submissionFileFormats[0].filename.replace("%l", solvedTask.submissionFileFormats[0].extension),
          'language': language
        },
        {
          "content": draftInput,
          "fileid": "input",
          "filename": "input.txt",
          "language": language
        }
      ],
      'taskSlug': solvedTask.name
    }

    const url = `${CMS_BASE_URI_SAO}/submit-draft`;
    const contentType = 'application/vnd.com.jossemargt.sao.draft-submit-transaction+json';
    return this._postWithToken(url, task, contentType).then((data) => data);
  }

  retrieveDraftSubmitTrx = (url) => {
    const completeUrl = `${CMS_BASE_URI_SAO}${url}`;
    const contentType = 'application/vnd.com.jossemargt.sao.draft-submit-transaction+json';
    return this._getWithToken(completeUrl, contentType).then((data) => data);
  }

  retrieveDraftTrx = (url) => {
    const completeUrl = `${CMS_BASE_URI_SAO}${url}`;
    const contentType = 'application/vnd.com.jossemargt.sao.draft+json';
    return this._getWithToken(completeUrl, contentType).then((data) => data);
  }

  retrieveDraftResult = (url) => {
    const completeUrl = `${CMS_BASE_URI_SAO}${url}`;
    const contentType = 'application/vnd.com.jossemargt.sao.draft-result+json';
    return this._getWithToken(completeUrl, contentType).then((data) => data);
  }

  /* Scoreboard */

  getLeaderBoard = () => {
    const url = `${CMS_BASE_URI_SAO}/scores/sum`;
    return this._getWithToken(url).then((data) => data);
  }

  getUser = (id) => {
    const url = `${CMS_BASE_URI_PROFILE}/users/${id}`;
    return this._getWithToken(url).then((data) => data);
  }

  //
  retrieveUsersInfo = (users) => {
    const url = `${CMS_BASE_URI_PROFILE}/users/`;
    return this._postWithToken(url, users).then((data) => data);
  }

}

export const client = new Client();