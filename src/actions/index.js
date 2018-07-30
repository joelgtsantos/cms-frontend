import { client } from '../Client';

export const RECIEVE_TASKS = 'RECIEVE_TASKS';

export const RECIEVE_TASK = 'RECIEVE_TASK';

function recieveTasks(tasks) {
  return { 
    type: RECIEVE_TASKS, 
    tasks
  };
}

function recieveTask(task) {
  return { 
    type: RECIEVE_TASK, 
    task: task
  };
}

export function fetchTasks() {
  return function(dispatch){
    client.getTasks()
      .then(json => { dispatch(recieveTasks(json.content));})
  }
}

export function fetchTask(id) {
  return function(dispatch){
    client.getTask(id)
      .then(json => { dispatch(recieveTask(json));})
  }
}

