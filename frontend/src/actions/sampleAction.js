import Client from '../api/client';

export const sampleAction = () => {
  return {
    type: 'increment',
    payload: null
  }
}

export const sampleApiCall = () => {
	// const body = new FormData();
	// body.append("json", JSON.stringify({
	// 	'start': 'Natick'
	// }));
	// console.log(body);
	return dispatch => {
		Client.makeRequest('train/find', 'POST', JSON.stringify({'start': 'Natick'})).then((payload) => {
			console.log(payload);
			dispatch({
				type: 'api',
				payload: payload
			});
		})
	}
}
