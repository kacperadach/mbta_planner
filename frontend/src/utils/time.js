import moment from 'moment-timezone';

export const getCurrentTime = () => {
	return moment().locale('en').tz('America/New_York').format('h:mm a');
};

export const getTimeOptions = (currentTime) => {
	return [{value: currentTime, label:currentTime}];
};