import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'react-select/dist/react-select.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import Store from './store';
//import { Router, Route, Link, browserHistory } from 'react-router';

const StoreInstance = Store();

ReactDOM.render(
  <Provider store={StoreInstance}>
  	<App />
  </Provider>,
  document.getElementById('root')
);



// ReactDOM.render(
//   <Provider store={StoreInstance}>
//     <Router history={browserHistory}>
//     	<Route path="/" component={App} />
//     </Router>
//   </Provider>,
//   document.getElementById('root')
// );


// <Router>
//     	<Route path='/' component={App} />
//     </Router>