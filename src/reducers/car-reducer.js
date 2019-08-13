import { SET_BUTTON_ACTIVE, ADD_STOP, MOVE_TO_FLOOR, FLOOR_REACHED } from '../actions/car-actions';
const elevator = require('../domain/elevator');

export default function carReducer(state = {}, { type, payload }) {
    let newState = Object.assign({}, state);
    if (state['stops'] && state['stops'].length > 0) {
        newState['stops'] = state['stops'].slice(0);
    } else {
        newState['stops'] = [];
    }

    if (state['buttonPanelButtonsActive'] && state['buttonPanelButtonsActive'].length > 0) {
        newState['buttonPanelButtonsActive'] = state['buttonPanelButtonsActive'].slice(0);
    }

    switch (type) {
        case SET_BUTTON_ACTIVE:
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

            if (newState['stops'].includes(payload.floorNumber)) {
                // This stop is already queued up, do nothing
                console.log('ADD_STOP', 'floor already queued up');
                return newState;
            }

            // @TODO: logic around direction the elevator is going and inserting the
            //        stop in a logical fashion
            newState['stops'] = elevator.addStopToQueue(newState['currentFloor'], newState['stops'], payload.floorNumber);

            // Set a new direction regardless
            newState['direction'] = getDirection(
                newState['currentFloor'], 
                newState['stops'][0]
            )

            // We want to be "moving" if there are any stops in the queue
            newState['isMoving'] = true;
            
            console.log('ADD_STOP', newState);
            return newState;

        case MOVE_TO_FLOOR:
            newState['currentFloor'] = payload.floorNumber;

            console.log('MOVE_TO_FLOOR', newState);
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

            console.log('FLOOR_REACHED', newState);
            return newState;

        default:
            return newState;
    }
}

function getDirection(currentFloor, nextFloor) {
    return nextFloor - currentFloor > 0 ? 'up' : 'down';
}
