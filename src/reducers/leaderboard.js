import { RECEIVE_LEADERBOARD, ADD_USER_LEADERBOARD, RESET_LEADERBOARD } from '../actions';

const initialUserState = {

  arr:[]
}

function leaderboard(state = initialUserState, action){
  switch(action.type){
    case RECEIVE_LEADERBOARD:
      return action.leaderboard;
    case RESET_LEADERBOARD:
      return initialUserState;
    case ADD_USER_LEADERBOARD:
      return { 
                  ...state,
                  arr: [...state.arr, action.user]
              };
    default:
      return state;
  }
}

export default leaderboard;