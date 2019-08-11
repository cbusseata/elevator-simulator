export const ADD_STOP = 'car:add-stop';
export const MOVE_TO_FLOOR = 'car:move-to-floor';
export const FLOOR_REACHED = 'car:floor-reached';

export function addStop(floorNumber) {
    return {
        type: ADD_STOP,
        payload: {
             floorNumber: floorNumber,
        }
    };
}

export function moveToFloor(floorNumber) {
    return {
        type: MOVE_TO_FLOOR,
        payload: {
             floorNumber: floorNumber,
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
