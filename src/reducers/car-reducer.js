import { ADD_STOP } from '../actions/car-actions';

export default function carReducer(state = [], { type, payload }) {
    switch (type) {
        case ADD_STOP:
            if (state['stops'].includes(payload.floorNumber)) {
                // This stop is already queued up, do nothing
                console.log(state);
                return state;
            }

            // @TODO: logic around direction the elevator is going and inserting the
            //        stop in a logical fashion
            let newState = state;
            newState['stops'] = state['stops'].slice(0);
            newState['stops'].push(payload.floorNumber);

            console.log(newState);
            return newState;
        default:
            return state;
    }
}
