import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './redux/reducer';
import App from './App';

const store = createStore(reducer, applyMiddleware(thunk));

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Store: any;
  }
}

window.Store = window.Store || {};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
