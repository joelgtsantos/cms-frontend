import React from 'react';
import Loadable from 'react-loadable'

//import DefaultLayout from './containers/DefaultLayout';

import CmsLayout from './cmscontainers/CmsLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Users = Loadable({
  loader: () => import('./views/Users/Users'),
  loading: Loading,
});

const User = Loadable({
  loader: () => import('./views/Users/User'),
  loading: Loading,
});

const Tasks = Loadable({
  loader: () => import('./views/Tasks'),
  loading: Loading,
});

const Task = Loadable({
  loader: () => import('./views/Tasks/Task'),
  loading: Loading,
});

const Profile = Loadable({
  loader: () => import('./views/Profile'),
  loading: Loading,
});



// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: CmsLayout },
  { path: '/tasks', exact: true, name: 'Tasks', component: Tasks },
  { path: '/tasks/:id', exact: true, name: 'Task', component: Task },
  { path: '/Profile', exact: true, name: 'Profile', component: Profile },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
