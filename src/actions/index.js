import { client } from '../Client';

export const RECIEVE_TASKS = 'RECIEVE_TASKS';

function recieveTasks(tasks) {
  return { 
    type: RECIEVE_TASKS, 
    tasks
  };
}

export function fetchTasks() {
  return function(dispatch){
    client.getTaks()
      .then(json => dispatch(recieveTasks(json)))
  }
}

