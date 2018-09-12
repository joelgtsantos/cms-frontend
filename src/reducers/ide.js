import { SUBMIT_ENTRY, SUBMIT_ENTRY_FAILURE, RECEIVE_RESULT, RECEIVE_SCORE, RESET_IDE } from '../actions';

const initialState = {
  entry: {},
  result: {},
  score: {},
  status: 0,
};

function ide(state = initialState, action){
  switch(action.type){
    case SUBMIT_ENTRY_FAILURE:
      return Object.assign({}, state, {
        status: 0,
        result: action.entry,
      });
    case SUBMIT_ENTRY:
      const cstate = Object.assign({}, state, {
        status: 1,
        entry: action.entry,
      });
      return cstate;
    case RECEIVE_RESULT:
      let status = 1;
      //Check if score is ready
      if (action.result.evaluation.status === 'ok'){
        status = 2;
      }

      return Object.assign({}, state, {
        status: status,
        result: action.result,
      });
    case RECEIVE_SCORE:
      return Object.assign({}, state, {
        status: 3,
        score: action.score,
      });
    case RESET_IDE:
      return initialState;
    default:
      return state;
  }
}

export default ide;