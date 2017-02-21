import { Map } from 'immutable';

export default(state = Map({Trains: [], Searched: false}), { type, payload }) => {
  switch(type) {
    case 'trains_found':
      return state.merge({'Trains', payload, 'Searched': true});
    default:
      return state;
  }
};
