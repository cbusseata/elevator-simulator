export const SET_BUTTON_ACTIVE = 'buttonPanel:setButtonActive';

export function setButtonActive(floorNumber) {
    return {
        type: SET_BUTTON_ACTIVE,
        payload: {
             floorNumber: floorNumber,
        }
    };
}
