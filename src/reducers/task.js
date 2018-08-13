import { RECEIVE_TASK } from '../actions';

function task(state = [], action){
  switch(action.type){
    case RECEIVE_TASK:
      return action.task;
    default:
      return state;
  }
}

export default task;