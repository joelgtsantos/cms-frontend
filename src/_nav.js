export default {
  items: [
    {
      title: true,
      name: 'Menu',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Ejercicios',
      url: '/tasks',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      name: 'Punteos',
      url: '/users',
      icon: 'icon-pie-chart',
    },
    {
      name: 'Perfil',
      url: '/profile',
      icon: 'icon-pencil',
    },
  ],
};
