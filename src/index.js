import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import { createStore, applyMiddleware } from 'redux';
import transactions from './reducers';
import thunkMiddleware from 'redux-thunk'

const store = createStore(transactions, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);
