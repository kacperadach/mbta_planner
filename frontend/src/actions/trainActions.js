export const sampleApiCall = () => {
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