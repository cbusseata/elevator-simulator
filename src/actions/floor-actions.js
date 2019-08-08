export const SET_BUTTONS_ACTIVE = 'floor:setButtonsActive';

export function setButtonsActive(floorNumber, direction) {
    return {
        type: SET_BUTTONS_ACTIVE,
        payload: {
             floorNumber: floorNumber,
             direction: direction,
        }
    };
}
