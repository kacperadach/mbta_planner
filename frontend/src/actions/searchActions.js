import Client from '../api/client';

export const resetSearched = () => {
	return dispatch => {
		dispatch({
			type: 'reset_searched',
			payload: null
		});
	}
}

export const hideSearch = (body) => {
	return dispatch => {
		Client.makeRequest('user/searches/delete', 'POST', JSON.stringify(body)).then((payload) => {
			dispatch({
				type: 'search_deleted',
				payload: payload
			});
		});
	}
}