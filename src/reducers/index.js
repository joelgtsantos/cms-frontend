import { combineReducers } from 'redux';
import tasks from './tasks';
import task from './task';
import profile from './profile';
import ide from './ide';
import leaderboard from './leaderboard';

const rootReducer = combineReducers({ tasks, 
                                      task, 
                                      profile, 
                                      ide,
                                      leaderboard
                                    });

export default rootReducer;