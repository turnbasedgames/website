import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const BrowserFS = require('browserfs');

BrowserFS.install(window);
BrowserFS.configure({
  fs: 'LocalStorage',
  options: {},
}, (e: Error) => {
  if (e) {
    throw e;
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
