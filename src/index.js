/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
// this is entry point for webpack

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const hist = createBrowserHistory();

render(
  <Provider store={store}>
    <Router history={hist}>
      <App /> 
    </Router>
  </Provider>,
  document.getElementById('root'),
);
