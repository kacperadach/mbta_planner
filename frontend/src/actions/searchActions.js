
export const resetSearched = () => {
	return dispatch => {
		return {
			type: 'reset_searched',
			payload: null
		}
	}
}