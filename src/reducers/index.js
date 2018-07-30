import { combineReducers } from 'redux';
import { RECIEVE_TASKS, RECIEVE_TASK } from '../actions';


function tasks(state = [], action){
  switch(action.type){
    case RECIEVE_TASKS:
      return action.tasks;
    default:
      return state;
  }
}

function task(state = [], action){
  switch(action.type){
    case RECIEVE_TASK:
      return action.task;
    default:
      return state;
  }
}

const rootReducer = combineReducers({ tasks, task });

export default rootReducer;