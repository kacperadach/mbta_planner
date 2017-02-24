import { getUserId } from '../utils/uuid';
import Client from '../api/client';

export const updateUserId = () => {
	return dispatch => {
		const ls = window.localStorage;
		const id = ls['id'];
		if (id) {
			console.log('id found');
			return {
				type: 'user_id',
				payload: id
			}
		} else {
			const newId = getUserId();
			Client.makeRequest('user/register', 'POST', JSON.stringify({id: newId})).then(() => {
				ls['id'] = newId;
				return {
					type: 'user_id',
					payload: newId
				}
			});
		}
	}
}