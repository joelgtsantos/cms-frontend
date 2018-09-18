export default {
  items: [
    {
      title: true,
      name: 'Account',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Tasks',
      url: '/tasks',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'Ranking',
      url: '/users',
      icon: 'icon-pie-chart',
    },
    {
      name: 'Profile',
      url: '/profile',
      icon: 'icon-pencil',
    },
  ],
};
