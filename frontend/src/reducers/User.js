import { Map } from 'immutable';

export default(state = Map({'userId': '', 'searches': []}), { type, payload }) => {
  switch(type) {
    case 'user_id':
      return state.set('userId', payload);
    case 'searches':
      return state.set('searches', payload);
    case 'search_deleted':
    	return state.set('searches', payload);
    default:
      return state;
  }
};
