import Client from '../api/client';
import { resetSearched } from '../actions/searchActions';

export const getStationOptions = () => {
	return dispatch => {
		dispatch(resetSearched());
		Client.makeRequest('train/stations', 'GET').then((payload) => {
			dispatch({
				type: 'station_options',
				payload: payload
			});
		});
	}
}

export const getTrains = (body) => {
	return dispatch => {
		Client.makeRequest('train/find', 'POST', JSON.stringify(body)).then((payload) => {
			dispatch({
				type: 'trains_found',
				payload: payload
			});
		}, () => {
			dispatch({
				type: 'trains_found',
				payload: []
			});
		});
	}
}

export const getAllTimes = () => {
	return dispatch => {
		Client.makeRequest('train/time', 'GET').then((payload) => {
			dispatch({
				type: 'all_times',
				payload: payload
			});
		});
	}
}

