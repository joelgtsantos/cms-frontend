import { SUBMIT_ENTRY, RECEIVE_RESULT, RECEIVE_SCORE } from '../actions';

const initialState = {
  entry: {},
  result: {},
  score: {},
  status: 0,
};

function ide(state = initialState, action){
  switch(action.type){
    case SUBMIT_ENTRY:
      const cstate = Object.assign({}, state, {
        status: 1,
        entry: action.entry,
      });
      return cstate;
    case RECEIVE_RESULT:
      let status = 1;
      console.log("entjaklsjdfa 2");
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
    default:
      return state;
  }
}

export default ide;