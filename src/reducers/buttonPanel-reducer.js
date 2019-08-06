import { SET_BUTTON_ACTIVE } from '../actions/buttonPanel-actions';

export default function buttonPanelReducer(state = {}, { type, payload }) {
    switch (type) {
        case SET_BUTTON_ACTIVE:
            if (state['buttonsActive'].includes(payload.floorNumber)) {
                return state;
            }
            
            let buttonsActive = state['buttonsActive'].slice(0);
            buttonsActive.push(payload.floorNumber);
            
            return {
                buttonsActive: buttonsActive,
            };
        default:
            return state;
    }
}
