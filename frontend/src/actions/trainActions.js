import Client from '../api/client';

export const getStationOptions = () => {
	return dispatch => {
		Client.makeRequest('train/stations', 'GET').then((payload) => {
			dispatch({
				type: 'station_options',
				payload: payload
			});
		});
	}
}

export const getTrains = (body) => {
	console.log(body);
	return dispatch => {
		Client.makeRequest('train/find', 'POST', JSON.stringify(body)).then((payload) => {
			console.log(payload);
			dispatch({
				type: 'trains_found',
				payload: payload
			});
		});
	}
}