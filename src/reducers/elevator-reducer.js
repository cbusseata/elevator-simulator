import { 
    SET_CAR_PANEL_BUTTON_ACTIVE, 
    ADD_STOP, 
    FLOOR_REACHED, 
    SET_FLOOR_BUTTONS_ACTIVE, 
    FINISHED_DISEMBARKING 
} from '../actions/elevator-actions';

const elevator = require('../domain/elevator');

/**
 * Make adjustments to state according to the dispatched action, returning a new state object.
 * 
 * @param {Object=} state 
 * @param {Object}  actionData 
 * 
 * @return {Object}
 */
export default function carReducer(state = {}, { type, payload }) {
    let newState = deepCopyState(state);

    switch (type) {
        case SET_FLOOR_BUTTONS_ACTIVE:
            if (payload.floorNumber === newState['currentFloor'] && newState['status'] !== 'moving') {
                // The car is already at that floor, no change
                return newState;
            }

            let buttonState;
            if (newState['floorButtonPanels'][payload.floorNumber]) {
                // Copy the existing button state
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

            //console.log('SET_FLOOR_BUTTONS_ACTIVE', newState);
            return newState;

        case SET_CAR_PANEL_BUTTON_ACTIVE:
            if (newState['currentFloor'] === payload.floorNumber && newState['status'] !== 'moving') {
                return newState;
            }

            if (newState['buttonPanelButtonsActive'].includes(payload.floorNumber)) {
                return newState;
            }
            
            newState['buttonPanelButtonsActive'].push(payload.floorNumber);
            
            //console.log('SET_CAR_PANEL_BUTTON_ACTIVE', newState);
            return newState;
            
        case ADD_STOP:
            newState['stops'] = elevator.addStopToQueue(
                newState['currentFloor'], 
                newState['status'],
                newState['stops'], 
                payload.floorNumber,
                payload.intendedDirectionFromStop
            );

            // If we aren't disembarking, we want to be "moving" if there are any stops in the queue
            if (newState['status'] !== 'disembarking' && newState['stops'].length > 0) {
                newState['status'] = 'moving';
            }
            
            console.log('ADD_STOP', 'payload', payload, 'newState', newState);
            return newState;

        case FLOOR_REACHED:
            // Basically, pop the next floor off, we've reached it
            newState['stops'] = state['stops'].slice(1);
            newState['currentFloor'] = payload.floorNumber;
            // Open the doors
            newState['status'] = 'disembarking';

            // Remove from active button panel buttons
            if (newState['buttonPanelButtonsActive'].includes(payload.floorNumber)) {
                newState['buttonPanelButtonsActive'].splice(
                    newState['buttonPanelButtonsActive'].indexOf(payload.floorNumber),
                    1
                );
            }

            // No matter what, both the up and down buttons should be inactive on that floor now
            newState['floorButtonPanels'][payload.floorNumber] = {
                'upButtonsActive': false, 
                'downButtonsActive': false
            };

            //console.log('FLOOR_REACHED', newState);
            return newState;

        case FINISHED_DISEMBARKING:
            // Now that the doors are shut, if it has somewhere else to go, it should be 'moving',
            //  otherwise, it will be 'idle'
            newState['status'] = newState['stops'].length > 0 ? 'moving' : 'idle';

            //console.log('FINISHED_DISEMBARKING', newState);
            return newState;

        default:
            return newState;
    }
}

/**
 * Creates and returns a deep copy of the state object passed as input.
 * 
 * @param {Object} state State object to copy
 * 
 * @return {Object}
 */
function deepCopyState(state) {
    let newState = Object.assign({}, state);

    newState['stops'] = arrayFieldCopy(state, 'stops');
    newState['floorButtonPanels'] = arrayFieldCopy(state, 'floorButtonPanels');
    newState['buttonPanelButtonsActive'] = arrayFieldCopy(state, 'buttonPanelButtonsActive');

    return newState;
}

/**
 * Copies an array field (or returns an empty array).
 * 
 * @param {Object} state 
 * @param {string} field 
 * 
 * @return {Array}
 */
function arrayFieldCopy(state, field) {
    return (state[field] && state[field].length > 0) ?
        state[field].slice(0) : 
        [];
}
