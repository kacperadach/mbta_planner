import { getUserId } from '../utils/uuid';
import Client from '../api/client';

export const updateUserId = () => {
	return dispatch => {
		const ls = window.localStorage;
		const id = ls['id'];
		if (id) {
      dispatch(getUserSearches(id));
			dispatch({
				type: 'user_id',
				payload: id
			});
		} else {
			const newId = getUserId();
			Client.makeRequest('user/register', 'POST', JSON.stringify({id: newId})).then(() => {
				ls['id'] = newId;
				dispatch(getUserSearches(newId));
				dispatch({
					type: 'user_id',
					payload: newId
				});
			});
		}
	}
}

export const getUserSearches = (user_id) => {
	return dispatch => {
	    Client.makeRequest('user/searches', 'POST', JSON.stringify({id: user_id})).then((payload) => {
	      dispatch({
	        type: 'searches',
	        payload
	      });
	    });
  	}
};

export const deleteSearch = (search_id) => {
	
}