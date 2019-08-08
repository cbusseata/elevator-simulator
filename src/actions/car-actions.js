export const ADD_STOP = 'car:add-stop';

export function addStop(floorNumber) {
    return {
        type: ADD_STOP,
        payload: {
             floorNumber: floorNumber,
        }
    };
}
