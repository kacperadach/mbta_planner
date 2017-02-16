import { Map } from 'immutable';

export default(state = Map({value: 0}), { type, payload }) => {
    switch(type) {
        case 'increment':
            return state.set('value', state.get('value') + 1);
        default:
            return state;
    }
};
