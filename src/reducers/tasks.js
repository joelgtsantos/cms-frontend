import { RECEIVE_TASKS } from '../actions';

function tasks(state = [], action){
  switch(action.type){
    case RECEIVE_TASKS:
      return action.tasks;
    default:
      return state;
  }
}

export default tasks;