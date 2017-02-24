import { Map } from 'immutable';

export default(state = Map({'userId': '', 'searches': []}), { type, payload }) => {
  switch(type) {
    case 'user_id':
      return state.set('userId', payload);
    default:
      return state;
  }
};
