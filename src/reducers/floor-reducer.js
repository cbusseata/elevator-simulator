import { SET_BUTTONS_ACTIVE } from '../actions/floor-actions';

export default function floorReducer(state = [], { type, payload }) {
    switch (type) {
        case SET_BUTTONS_ACTIVE:
            let floors = state.slice(0);
            let buttonState;
            if (floors[payload.floorNumber]) {
                buttonState = Object.assign({}, floors[payload.floorNumber]);
            } else {
                // Create a new object with the correct value set, and insert it into the
                //  floors array
                buttonState = {
                    'upButtonsActive': false, 
                    'downButtonsActive': false
                };
            }
            
            buttonState[payload.direction+'ButtonsActive'] = true;
            floors[payload.floorNumber] = buttonState;

            return floors;
        default:
            return state;
    }
}
