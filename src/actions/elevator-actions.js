export const SET_BUTTON_ACTIVE = 'car:setButtonActive';
export const ADD_STOP = 'car:add-stop';
export const FLOOR_REACHED = 'car:floor-reached';
export const SET_FLOOR_BUTTONS_ACTIVE = 'car:setFloorButtonsActive';

export function setButtonActive(floorNumber) {
    return {
        type: SET_BUTTON_ACTIVE,
        payload: {
             floorNumber: floorNumber,
        }
    };
}

export function addStop(floorNumber, intendedDirectionFromStop = null) {
    return {
        type: ADD_STOP,
        payload: {
             floorNumber: floorNumber,
             intendedDirectionFromStop: intendedDirectionFromStop,
        }
    };
}

export function floorReached(floorNumber) {
    return {
        type: FLOOR_REACHED,
        payload: {
             floorNumber: floorNumber,
        }
    };
}

export function setFloorButtonsActive(floorNumber, direction) {
    return {
        type: SET_FLOOR_BUTTONS_ACTIVE,
        payload: {
             floorNumber: floorNumber,
             direction: direction,
        }
    };
}
