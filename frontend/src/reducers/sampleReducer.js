import { Map } from 'immutable';

export default(state = Map({value: 0}), { type, payload }) => {
    switch(type) {
        case 'api':
            return state.set('value', payload);
        default:
            return state;
    }
};
