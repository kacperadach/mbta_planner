import moment from 'moment-timezone';

export const getCurrentTime = () => {
	return moment().locale('en').tz('America/New_York').format('h:mm a');
};

export const getTimeOptions = (currentTime) => {
	//if currentTime 
	console.log([{value: currentTime, label:currentTime}]);
	return [{value: currentTime, label:currentTime}];
	// split = currentTime.split(' ')[0]
	// hour = split.split(':')[0]
	// minute = split.split(':')[1]

};