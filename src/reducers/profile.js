import { RECEIVE_PROFILE, SAVE_PROFILE } from '../actions';


function profile(state = [], action){
  switch(action.type){
    case RECEIVE_PROFILE:
      return action.profile;
    case SAVE_PROFILE:
      return action.profile;
    default:
      return state;
  }
}

export default profile;