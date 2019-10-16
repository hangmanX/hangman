/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
// this is entry point for webpack

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom'

render(
  <Provider store={store}>
    <Router>
      <App /> 
    </Router>
  </Provider>,
  document.getElementById('root'),
);
