import { Map } from 'immutable';
import { getCurrentTime } from '../utils/time';

export default(state = Map({'stations': [], 'currentTime': getCurrentTime()}), { type, payload }) => {
  switch(type) {
    case 'station_options':
      return state.set('stations', payload);
    case 'newtime':
    	return state.set('currentTime', payload);
    default:
      return state;
  }
};
