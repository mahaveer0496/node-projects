import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/App';

const routes = (
  <Router>
    <App />
  </Router>
);
render(routes, document.getElementById('app'));

