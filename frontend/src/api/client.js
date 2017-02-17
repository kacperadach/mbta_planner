const checkStatus = (response) => {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	const error = new Error(`HTTP Error ${response.statusText}`);
	error.status = response.statusText;
	error.response = response;
	console.log(error);
	throw error;
}

const parseJSON = (response) => {
	return response.json();
}

const makeRequest = (endpoint, method, body) => {
	return fetch(endpoint, {
		accept: 'application/json',
		method: method,
		body: body
	}).then(checkStatus)
	  .then(parseJSON);
}

const Client = { makeRequest };

export default Client;