export const SET_CAR_PANEL_BUTTON_ACTIVE = 'elevator:set-button-active';
export const ADD_STOP = 'elevator:add-stop';
export const FLOOR_REACHED = 'elevator:floor-reached';
export const SET_FLOOR_BUTTONS_ACTIVE = 'elevator:set-floor-buttons-active';
export const FINISH_DISEMBARKING = 'elevator:finish-disembarking';
export const DOORS_CLOSING = 'elevator:doors-closing';

/**
 * Creates the event that intends to set a button on the elevator car's button panel to active.
 * 
 * @param {number} floorNumber 
 * 
 * @return {Object}
 */
export function setCarPanelButtonActive(floorNumber) {
    return {
        type: SET_CAR_PANEL_BUTTON_ACTIVE,
        payload: {
             floorNumber: floorNumber,
        }
    };
}

/**
 * Creates the event that intends to add a stop to the queue of stops.
 * 
 * @param {number}  floorNumber 
 * @param {string=} intendedDirectionFromStop Optional.  The intended direction to go from the floor
 *                                             number, as is indicated by buttons on the individual
 *                                             floor button panel.  This will be null when adding a
 *                                             a stop originating from a car's button panel.
 * 
 * @return {Object}
 */
export function addStop(floorNumber, intendedDirectionFromStop = null) {
    return {
        type: ADD_STOP,
        payload: {
             floorNumber: floorNumber,
             intendedDirectionFromStop: intendedDirectionFromStop,
        }
    };
}

/**
 * Creates the event that notifies that a floor has been reached.
 * 
 * @param {number} floorNumber 
 * 
 * @return {Object}
 */
export function floorReached(floorNumber) {
    return {
        type: FLOOR_REACHED,
        payload: {
             floorNumber: floorNumber,
        }
    };
}

/**
 * Creates the event that intends to set the buttons with the given direction on a particular floor
 *  to active.  Each floor's set of buttons are linked.
 * 
 * @param {number} floorNumber
 * @param {string} direction   'up' or 'down'
 * 
 * @return {Object}
 */
export function setFloorButtonsActive(floorNumber, direction) {
    return {
        type: SET_FLOOR_BUTTONS_ACTIVE,
        payload: {
             floorNumber: floorNumber,
             direction: direction,
        }
    };
}

/**
 * Creates the event that notifies that the car has finished disembarking (opening/closing doors).
 * 
 * @return {Object}
 */
export function finishDisembarking() {
    return {
        type: FINISH_DISEMBARKING,
    }
}

/**
 * Creates the event that notifies that the car has finished unloading and the doors are ready to close.
 * 
 * @return {Object}
 */
export function closeDoors() {
    return {
        type: DOORS_CLOSING,
    }
}
