import { client } from '../Client';

export const RECEIVE_TASKS = 'RECEIVE_TASKS';

export const RECEIVE_TASK = 'RECEIVE_TASK';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';

export const SAVE_PROFILE = 'SAVE_PROFILE';

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

