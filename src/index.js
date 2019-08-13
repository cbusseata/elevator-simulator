import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import carReducer from './reducers/car-reducer';

// REDUCER -> Describe how your actions transform state into the next state
const allReducers = combineReducers({
    car: carReducer,
});

// STORE -> GLOBALIZED STATE
const store = createStore(
    allReducers,
    {
        car: {
            isMoving: false,
            direction: null,
            currentFloor: 1,
            stops: [],
            buttonPanelButtonsActive: [],
            floorButtonPanels: [], // Will contain [floor_number => {upButtonsActive: true|false, downButtonsActive: true|false}]
        },
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// ACTION -> Something that describes what you want to do

// DISPATCH -> Actually execute the action

// Action is called, reducer will check which action is taken, and based on action
//  it will modify the store

// Display it in the console
//store.subscribe(() => console.log('store subscription', store.getState()));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
