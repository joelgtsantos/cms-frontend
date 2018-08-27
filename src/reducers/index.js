import { combineReducers } from 'redux';
import tasks from './tasks';
import task from './task';
import profile from './profile';
import ide from './ide'

const rootReducer = combineReducers({ tasks, task, profile, ide });

export default rootReducer;