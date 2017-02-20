
export const setFormValue = (form, value) => {
	return dispatch => {
		dispatch({
			type: 'set',
			payload: [form, value]
		});
	}
}
