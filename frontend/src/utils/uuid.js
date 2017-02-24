import uuid from 'uuid/v1';

export const getUserId = () => {
	return uuid();
};