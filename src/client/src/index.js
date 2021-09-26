import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {createStore,compose, applyMiddleware} from 'redux';
import rootReducer from './reducers/index';
import thunkMiddleware from 'redux-thunk'

import './css/index.css';
import App from '../src/App';

const configureStore = (preloadedState)=> {
    const middlewares = [thunkMiddleware]
    const middlewareEnhancer = applyMiddleware(...middlewares)
  
    const enhancers = [middlewareEnhancer]
    const composedEnhancers = compose(...enhancers)
  
    const store = createStore(rootReducer, preloadedState, composedEnhancers)
  
    return store
}

const store = configureStore();
render((
    <Provider store={store}>
        <App/>
    </Provider>
), document.getElementById('root'));

