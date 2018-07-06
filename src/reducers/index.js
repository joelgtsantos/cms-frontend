import { combineReducers } from 'redux';
import { RECIEVE_TASKS } from '../actions';

function tasks(state = [], action){
  switch(action.type){
    case RECIEVE_TASKS:
      return action.tasks;
    default:
      return state;
  }
}

const rootReducer = combineReducers({ tasks });

export default rootReducer;