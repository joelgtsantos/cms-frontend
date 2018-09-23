import { RECEIVE_LEADERBOARD, ADD_USER_LEADERBOARD, RESET_LEADERBOARD } from '../actions';

const initialUserState = [];

function leaderboard(state = initialUserState, action){
  switch(action.type){
    case RECEIVE_LEADERBOARD:
      return action.leaderboard;
    case RESET_LEADERBOARD:
      return initialUserState;
    default:
      return state;
  }
}

export default leaderboard;