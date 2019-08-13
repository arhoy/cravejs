import React from 'react';

import { hydrate, render } from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ReactGA from 'react-ga';

import './index.css';

 // google analytics tag
  ReactGA.initialize('UA-138449311-1');
  ReactGA.pageview(window.location.pathname + window.location.search);


const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

if(module.hot){
    module.hot.accept();
}
