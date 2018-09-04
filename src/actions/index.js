import history from '../history';
import { client } from '../Client';

export const RECEIVE_TASKS = 'RECEIVE_TASKS';

export const RECEIVE_TASK = 'RECEIVE_TASK';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';

export const SAVE_PROFILE = 'SAVE_PROFILE';

export const SUBMIT_ENTRY = 'SUBMIT_ENTRY';

export const SUBMIT_ENTRY_FAILURE = 'SUBMIT_ENTRY_FAILURE';

export const RECEIVE_RESULT = 'RECEIVE_RESULT';

export const RECEIVE_SCORE = 'RECEIVE_SCORE';

function receiveTasks(tasks) {
  return { 
    type: RECEIVE_TASKS, 
    tasks
  };
}

function receiveTask(task) {
  return { 
    type: RECEIVE_TASK, 
    task: task
  };
}

function login(user){
  return {
    type: LOGIN_SUCCESS,
    user: user
  }
}

function receiveProfile(profile){
  return {
    type: RECEIVE_PROFILE,
    profile: profile
  }
}

function saveProfile(profile){
  return {
    type: LOGIN_SUCCESS,
    profile: profile
  }
}

function receiveEntry(entry){
  return {
    type: SUBMIT_ENTRY,
    entry: entry
  }
}

function receiveEntryFailure(entry){
  return {
    type: SUBMIT_ENTRY_FAILURE,
    entry: entry
  }
}

function receiveResult(result){
  return {
    type: RECEIVE_RESULT,
    result: result
  }
}

function receiveScore(score){
  return {
    type: RECEIVE_SCORE,
    score: score
  }
}

//API Calls
export function fetchTasks() {
  return function(dispatch){
    client.getTasks()
      .then(json => { dispatch(receiveTasks(json.content));})
  }
}

export function fetchTask(id) {
  return function(dispatch){
    client.getTask(id)
      .then(json => { dispatch(receiveTask(json));})
  }
}

export function requestLogin(token) {
  return function(dispatch){
    client.login(token)
      .then(json => { console.log(json);})
  }
}

export function fetchProfile() {
  return function(dispatch){
    client.getProfile()
      .then(json => { dispatch(receiveProfile(json));})
  }
}

export function saveProfile(profile) {
  return function(dispatch){
    client.saveProfile(profile)
      .then(json => { console.log(json);})
  }
}

export function submitEntry(solvedTask, content, language) {
  return function(dispatch){
    //Change the files's name of a submited task
    //by using the programming language selected
    if (solvedTask.submissionFileFormats[0].filename.includes('.%l')){
      const filesplit = solvedTask.submissionFileFormats[0].filename.split('.%l');
      const filename = filesplit[0];
      let newFilename = "";

      if (language === 'java'){
        newFilename = `${filename}.java`;
      }else if(language === 'python'){
        newFilename = `${filename}.py`;
      }else if(language === 'python'){
        newFilename  = `${filename}.rb`;
      }
        solvedTask.submissionFileFormats[0].filename = newFilename;
    }
    
    client.submitEntry(solvedTask, content, language)
      .then(json => { dispatch(receiveEntry(json));})
      .catch((err) => { dispatch(receiveEntryFailure(err)) })
  }
}

export function retrieveResult(id) {
  return function(dispatch){
    client.retrieveResult(id)
    .then(json => { dispatch(receiveResult(json));})
  }
}

export function retrieveScore(id) {
  return function(dispatch){
    client.retrieveScore(id)
    .then(json => { dispatch(receiveScore(json));})
  }
}



