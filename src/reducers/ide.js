import { SUBMIT_ENTRY, 
          SUBMIT_ENTRY_FAILURE,
          RECEIVE_ENTRY_SUBMIT_TRX,
          RECEIVE_ENTRY_TRX,
          RECEIVE_ENTRY_RESULT,
          SUBMIT_DRAFT, 
          SUBMIT_DRAFT_FAILURE,
          RECEIVE_DRAFT_SUBMIT_TRX,
          RECEIVE_DRAFT_TRX,
          RECEIVE_DRAFT_RESULT
        } from '../actions';

const initialState = {
  entry: {},
  result: {},
  score: {},
  draft: {},
  status: 0,
};

function ide(state = initialState, action){
  switch(action.type){
    case SUBMIT_ENTRY_FAILURE:
      return Object.assign({}, state, {
        status: 0,
        entry: action.entry,
      });
    case SUBMIT_ENTRY:
      const cstate = Object.assign({}, state, {
        status: 1,
        entry: action.entry,
      });
      return cstate;
    case RECEIVE_ENTRY_SUBMIT_TRX:
      let status = 1;
      //Check if score is ready
      if (action.entry.links){
        if(action.entry.links.entry){
          status = 2;
        }
      }
      return Object.assign({}, state, {
        status: status,
        entry: action.entry,
      });
    case RECEIVE_ENTRY_TRX:
      return Object.assign({}, state, {
        status: 3,
        entry: action.entry,
      });
    case RECEIVE_ENTRY_RESULT:
      return Object.assign({}, state, {
        status: 4,
        result: action.result,
      });
    /* Drafts */
    case SUBMIT_DRAFT_FAILURE:
      return Object.assign({}, state, {
        status: 0,
        draft: action.draft,
      });
    case SUBMIT_DRAFT:
      return Object.assign({}, state, {
        status: 5,
        draft: action.draft,
      });
    case RECEIVE_DRAFT_SUBMIT_TRX:
      status = 5;
      //Check if score is ready
      if (action.draft.links){
        if(action.draft.links.draft){
          status = 6;
        }
      }
      return Object.assign({}, state, {
        status: status,
        draft: action.draft,
      });
    case RECEIVE_DRAFT_TRX:
      return Object.assign({}, state, {
        status: 7,
        draft: action.draft,
      });
    case RECEIVE_DRAFT_RESULT:
      return Object.assign({}, state, {
        status: 8,
        result: action.result,
      });
    default:
      return state;
  }
}

export default ide;