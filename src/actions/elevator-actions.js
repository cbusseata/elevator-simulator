export const SET_CAR_PANEL_BUTTON_ACTIVE = 'elevator:set-button-active';
export const ADD_STOP = 'elevator:add-stop';
export const FLOOR_REACHED = 'elevator:floor-reached';
export const SET_FLOOR_BUTTONS_ACTIVE = 'elevator:set-floor-buttons-active';
export const FINISHED_DISEMBARKING = 'elevator:finished-disembarking';

/**
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
 * @param {number}  floorNumber 
 * @param {string=} intendedDirectionFromStop
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
 * @param {number} floorNumber 
 * @param {string} direction
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
 * @return {Object}
 */
export function finishedDisembarking() {
    return {
        type: FINISHED_DISEMBARKING
    }
}
