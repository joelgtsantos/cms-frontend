# React-Based Frontend for CMS 

A react app for displaying a basic workflow of CMS contest having a base a CoreUI free template.


## Live App

* [CMS Contest](https://cms-frontend.herokuapp.com)

## Installation

``` bash
# clone the repo
$ git clone https://github.com/joelgtsantos/cms-frontend.git my-project

# go into app's directory
$ cd my-project

# install app's dependencies
$ npm install
```
### Basic usage

``` bash
# dev server  with hot reload at http://localhost:3000
$ npm start
```

## What's included

```
CoreUI-React#v2.0.0
├── public/          #static files
│   ├── assets/      #assets
│   └── index.html   #html temlpate
│
├── src/             #project root
|   ├── actions/     #redux actions
│   ├── containers/  #container source
│   ├── reducers/    #redux reducers
│   ├── scss/        #user scss/css source
│   ├── views/       #views source
│   ├── App.js
│   ├── App.test.js
│   ├── index.js    
│   ├── Client.js    #CMS REST-client
│   ├── config.js    #config APIs urls
│   ├── _nav.js      #sidebar config
│   └── routes.js    #routes config
│
└── package.json
```

#### Backend connections
To set up the CMS backend system which CMS Fronted is going to be connected to is necessary to specify what are the URLS of each of the systems obiting around CMS. Since all of the API's are behind Zuul(HTTP Proxy) an URL usually beggins with  'localhost:9000/APPNAME'

```javascript
---
  domainProfile: 'localhost:9000/cmsusers/cmsusers/api/v1';
  domainGalatea: 'localhost:9000/galatea/galatea/v1';
  domainSao: 'localhost:9000/sao/sao/v1';
  protocol: 'http';
```

## Credits

- [CoreUI](https://github.com/coreui/coreui-free-react-admin-template) by [CoreUI template ]