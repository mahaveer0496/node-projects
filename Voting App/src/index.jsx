import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import App from './components/App';
import store from './redux/reducer';

const routes = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
render(routes, document.getElementById('app'));

