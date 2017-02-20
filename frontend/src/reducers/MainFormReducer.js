import { Map } from 'immutable';

export default(state = Map({Start: '', Destination: '', Time: '', Day: ''}), { type, payload }) => {
    switch(type) {
        case 'set':
            return state.set(payload[0], payload[1]);
        default:
            return state;
    }
};
