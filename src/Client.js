import history from './history';

const CMS_BASE_URI = 'http://localhost:8080/app/api';
const SESSION_STORAGE_KEY = 'access_token';

class Client {

  loggedIn = true;

  _get(url, body) {
    const bodyParams = Object.keys(body).map( key => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(body[key]);
    }).join('&');

    return fetch(url +'?' + bodyParams, {
        method: 'GET',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      }).then(this.checkStatus)
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

  getTaks() {
    //const url = CMS_BASE_URI + '/user/extra';
    //return this._post(url, profile).then((data) => data);
    return new Promise((resolve, reject) => {
        resolve(
          [
            { 
              id: 1,
              title : 'Taks 1',
              body: 'body task 1'
            },
            { 
              id: 2,
              title : 'Taks 2',
              body: 'body task 2'
            }
          ]
        );
    });
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

  login = () => {
    localStorage.setItem(SESSION_STORAGE_KEY, true);
    history.replace('/#');
  }

  logout = () => {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    history.push('/#/login');
  }

  isAuthenticated = () => {
    return this.loggedIn && localStorage.getItem(SESSION_STORAGE_KEY);
  }


}

export const client = new Client();