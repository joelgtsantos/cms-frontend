import { client } from '../Client';

export const RECEIVE_TASKS = 'RECEIVE_TASKS';

export const RECEIVE_TASK = 'RECEIVE_TASK';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';

export const SAVE_PROFILE = 'SAVE_PROFILE';

export const SUBMIT_ENTRY = 'SUBMIT_ENTRY';

export const SUBMIT_ENTRY_FAILURE = 'SUBMIT_ENTRY_FAILURE';

export const RECEIVE_ENTRY_SUBMIT_TRX = 'RECEIVE_ENTRY_SUBMIT_TRX';

export const RECEIVE_ENTRY_TRX = 'RECEIVE_ENTRY_TRX';

export const RECEIVE_ENTRY_RESULT = 'RECEIVE_ENTRY_RESULT';

export const SUBMIT_DRAFT = 'SUBMIT_DRAFT';

export const SUBMIT_DRAFT_FAILURE = 'SUBMIT_DRAFT_FAILURE';

export const RECEIVE_DRAFT_SUBMIT_TRX = 'RECEIVE_DRAFT_SUBMIT_TRX';

export const RECEIVE_DRAFT_TRX = 'RECEIVE_DRAFT_TRX';

export const RECEIVE_DRAFT_RESULT = 'RECEIVE_DRAFT_RESULT';

export const RESET_IDE = 'RESET_IDE';

export const RECEIVE_LEADERBOARD = 'RECEIVE_LEADERBOARD';

export const ADD_USER_LEADERBOARD = 'ADD_USER_LEADERBOARD';

export const RESET_LEADERBOARD = 'RESET_LEADERBOARD';


//Dispatch functions
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

/*function login(user){
  return {
    type: LOGIN_SUCCESS,
    user: user
  }
}*/

function receiveProfile(profile){
  return {
    type: RECEIVE_PROFILE,
    profile: profile
  }
}

/*function saveProfile(profile){
  return {
    type: LOGIN_SUCCESS,
    profile: profile
  }
}*/

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

function receiveEntrySubmitTrx(entry){
  return {
    type: RECEIVE_ENTRY_SUBMIT_TRX,
    entry: entry
  }
}

function receiveEntryTrx(entry){
  return {
    type: RECEIVE_ENTRY_TRX,
    entry: entry
  }
}


function receiveEntryResult(result){
  return {
    type: RECEIVE_ENTRY_RESULT,
    result: result
  }
}


/* For drafts */

function receiveDraft(draft){
  return {
    type: SUBMIT_DRAFT,
    draft: draft
  }
}

function receiveDraftFailure(draft){
  return {
    type: SUBMIT_DRAFT_FAILURE,
    draft: draft
  }
}

function receiveDraftSubmitTrx(draft){
  return {
    type: RECEIVE_DRAFT_SUBMIT_TRX,
    draft: draft
  }
}

function receiveDraftTrx(draft){
  return {
    type: RECEIVE_DRAFT_TRX,
    draft: draft
  }
}


function receiveDraftResult(result){
  return {
    type: RECEIVE_DRAFT_RESULT,
    result: result
  }
}

/* Scoreboard */

function applyResetIDE(){
  return {
    type: RESET_IDE
  }
}

function receiveLeaderboard(leaderboard){
  return {
    type: RECEIVE_LEADERBOARD,
    leaderboard: leaderboard
  }
}

/*function addUserLeaderboard(user){
  return {
    type: ADD_USER_LEADERBOARD,
    user: user
  }
}*/

/*function resetLeaderboard(){
  return {
    type: RESET_LEADERBOARD
  }
}*/

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
      //const filesplit = solvedTask.submissionFileFormats[0].filename.split('.%l');

      let extension = "";

      if (language === 'java'){
        extension = 'java';
      }else if(language === 'python'){
        extension = 'py';
      }else if(language === 'javascript'){
        extension  = 'js';
      }
      
      solvedTask.submissionFileFormats[0].extension = extension;
    }
    
    client.submitEntry(solvedTask, content, language)
      .then(json => { dispatch(receiveEntry(json));})
      .catch((err) => { dispatch(receiveEntryFailure(err)) })
  }
}

export function retrieveEntrySubmitTrx(url) {
  return function(dispatch){
    client.retrieveEntrySubmitTrx(url)
    .then(json => { dispatch(receiveEntrySubmitTrx(json));})
  }
}

export function retrieveEntryTrx(url) {
  return function(dispatch){
    client.retrieveEntryTrx(url)
    .then(json => { dispatch(receiveEntryTrx(json));})
  }
}

export function retrieveEntryResult(url) {
  return function(dispatch){
    client.retrieveEntryResult(url)
    .then(json => { dispatch(receiveEntryResult(json));})
  }
}

/* For drafts */

export function submitDraft(solvedTask, content, language, draftInput) {
  return function(dispatch){
    //Change the files's name of a submited task
    //by using the programming language selected
    if (solvedTask.submissionFileFormats[0].filename.includes('.%l')){
      //const filesplit = solvedTask.submissionFileFormats[0].filename.split('.%l');

      let extension = "";

      if (language === 'java'){
        extension = 'java';
      }else if(language === 'python'){
        extension = 'py';
      }else if(language === 'javascript'){
        extension  = 'js';
      }
      
      solvedTask.submissionFileFormats[0].extension = extension;
    }
    
    client.submitDraft(solvedTask, content, language, draftInput)
      .then(json => { dispatch(receiveDraft(json));})
      .catch((err) => { dispatch(receiveDraftFailure(err)) })
  }
}

export function retrieveDraftSubmitTrx(url) {
  return function(dispatch){
    client.retrieveDraftSubmitTrx(url)
    .then(json => { dispatch(receiveDraftSubmitTrx(json));})
  }
}

export function retrieveDraftTrx(url) {
  return function(dispatch){
    client.retrieveDraftTrx(url)
    .then(json => { dispatch(receiveDraftTrx(json));})
  }
}

export function retrieveDraftResult(url) {
  return function(dispatch){
    client.retrieveDraftResult(url)
    .then(json => { dispatch(receiveDraftResult(json));})
  }
}


/* Scoreboard */

export function resetIDE() {
  return function(dispatch){
    dispatch(applyResetIDE());
  }
}

export function entryFailure() {
  return function(dispatch){
    dispatch(receiveEntryFailure());
  }
}

export function fetchLeaderboard() {
  return function(dispatch){
    client.getLeaderBoard()
    .then(json => {
        //dispatch(resetLeaderboard());
        const usersId = [];
        const leaderboard = [];
        
        //Creates info of users request
        json.forEach((user) => {
          usersId.push(user.userID);
        });

        //Retrieve info users
        client.retrieveUsersInfo({users: usersId})
          .then(users => { 
          //user.name = j.firstName;

          //Matchs every user with its name
          json.forEach((user) => {
            //Find match
            let newUser = users.find(u => u.id === user.userID);
            newUser.score = user.value;
            leaderboard.push(newUser);
          });

          //Finally update state to show leaderboard
          dispatch(receiveLeaderboard(leaderboard));
        });
    })
  }
}



