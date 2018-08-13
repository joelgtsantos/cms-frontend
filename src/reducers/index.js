import { combineReducers } from 'redux';
import tasks from './tasks';
import task from './task';
import profile from './profile';


const rootReducer = combineReducers({ tasks, task, profile });

export default rootReducer;