import { Map } from 'immutable';

export default(state = Map({Trains: [], Searched: false}), { type, payload }) => {
  switch(type) {
    case 'trains_found':
      return state.merge({'Trains': payload, 'Searched': true});
    case 'reset_searched':
    	console.log('hey');
    	return state.set({Searched: false});
    default:
      return state;
  }
};
