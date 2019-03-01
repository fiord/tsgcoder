import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import TSGCoder from './TSGCoder';
import reducer from './redux/reducer';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <TSGCoder />
  </Provider>,
  document.getElementById('root')
);
