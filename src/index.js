import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import elevatorReducer from './reducers/elevator-reducer';

const store = createStore(
    elevatorReducer,
    {
        status: 'idle', // idle, moving, or disembarking
        currentFloor: 1,
        stops: [],
        buttonPanelButtonsActive: [],
        floorButtonPanels: [], // Will contain [floor_number => {upButtonsActive: true|false, downButtonsActive: true|false}]
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
