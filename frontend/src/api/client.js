const search = () => {
	return fetch(`train/test`, {
		accept: 'application/json',
	}).then(checkStatus)
	  .then(parseJSON);
}

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

const Client = { search };

export default Client;