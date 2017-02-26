import { getCurrentTime } from '../utils/time';


export const setFormValue = (form, value) => {
	return dispatch => {
		dispatch({
			type: 'set',
			payload: [form, value]
		});
	}
}

export const getNextTime = () => {
	return dispatch => {
		dispatch({
			type: 'newtime',
			payload: getCurrentTime()
		});
		window.setTimeout(() => {
			dispatch(getNextTime());
		}, 6000);
	}
}
