import { SET_BUTTON_ACTIVE, ADD_STOP, FLOOR_REACHED, SET_FLOOR_BUTTONS_ACTIVE } from '../actions/elevator-actions';
const elevator = require('../domain/elevator');

export default function carReducer(state = {}, { type, payload }) {
    let newState = Object.assign({}, state);

    if (state['stops'] && state['stops'].length > 0) {
        newState['stops'] = state['stops'].slice(0);
    } else {
        newState['stops'] = [];
    }

    if (state['floorButtonPanels'] && state['floorButtonPanels'].length > 0) {
        newState['floorButtonPanels'] = state['floorButtonPanels'].slice(0);
    } else {
        newState['floorButtonPanels'] = [];
    }

    if (state['buttonPanelButtonsActive'] && state['buttonPanelButtonsActive'].length > 0) {
        newState['buttonPanelButtonsActive'] = state['buttonPanelButtonsActive'].slice(0);
    } else {
        newState['buttonPanelButtonsActive'] = [];
    }

    switch (type) {
        case SET_FLOOR_BUTTONS_ACTIVE:
            if (payload.floorNumber === newState['currentFloor']) {
                console.log('SET_FLOOR_BUTTONS_ACTIVE', 'We are already on this floor');
                return newState;
            }

            let buttonState;
            if (newState['floorButtonPanels'][payload.floorNumber]) {
                buttonState = Object.assign({}, newState['floorButtonPanels'][payload.floorNumber]);
            } else {
                // Create a new object with the correct default values set
                buttonState = {
                    'upButtonsActive': false, 
                    'downButtonsActive': false
                };
            }
            
            buttonState[payload.direction+'ButtonsActive'] = true;
            newState['floorButtonPanels'][payload.floorNumber] = buttonState;

            return newState;

        case SET_BUTTON_ACTIVE:
            if (payload.floorNumber === newState['currentFloor']) {
                return newState;
            }

            if (newState['buttonPanelButtonsActive'].includes(payload.floorNumber)) {
                return newState;
            }
            
            newState['buttonPanelButtonsActive'].push(payload.floorNumber);
            
            return newState;
            
        case ADD_STOP:
            if (newState['currentFloor'] === payload.floorNumber) {
                // We are already at this floor
                console.log('ADD_STOP', 'we are already on this floor');
                return newState;
            }

            newState['stops'] = elevator.addStopToQueue(
                newState['currentFloor'], 
                newState['stops'], 
                payload.floorNumber,
                payload.intendedDirectionFromStop
            );

            // Set a new direction regardless
            newState['direction'] = getDirection(
                newState['currentFloor'], 
                newState['stops'][0]
            )

            // We want to be "moving" if there are any stops in the queue
            newState['isMoving'] = true;
            
            console.log('ADD_STOP', newState);
            return newState;

        case FLOOR_REACHED:
            newState['currentFloor'] = payload.floorNumber;
            // Basically, pop the next floor off
            newState['stops'] = state['stops'].slice(1);
            newState['isMoving'] = newState['stops'].length > 0 ? true : false;
            newState['direction'] = newState['stops'].length > 0 ? 
                getDirection(
                    newState['currentFloor'], 
                    newState['stops'][0]
                ) :
                null;

            // Remove from active button panel buttons
            if (newState['buttonPanelButtonsActive'].includes(payload.floorNumber)) {
                newState['buttonPanelButtonsActive'].splice(
                    newState['buttonPanelButtonsActive'].indexOf(payload.floorNumber),
                    1
                );
            }
            newState['floorButtonPanels'][payload.floorNumber] = {
                'upButtonsActive': false, 
                'downButtonsActive': false
            };

            console.log('FLOOR_REACHED', newState);
            return newState;

        default:
            return newState;
    }
}

function getDirection(currentFloor, nextFloor) {
    return nextFloor - currentFloor > 0 ? 'up' : 'down';
}
