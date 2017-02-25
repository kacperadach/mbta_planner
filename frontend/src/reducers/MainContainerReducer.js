import { Map } from 'immutable';
import { getCurrentTime } from '../utils/time';

export default(state = Map({stations: [], currentTime: getCurrentTime(), times: []}), { type, payload }) => {
  switch(type) {
    case 'station_options':
      return state.set('stations', payload);
    case 'newtime':
    	return state.set('currentTime', payload);
    case 'all_times':
    	return state.set('times', payload);
    default:
      return state;
  }
};
