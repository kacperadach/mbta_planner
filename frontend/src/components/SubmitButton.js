import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getTrains } from '../actions/trainActions';

const mapStateToProps = (state, props) => {
  return {
  	start: state.MainFormReducer.get('Start'),
  	destination: state.MainFormReducer.get('Destination'),
  	day: state.MainFormReducer.get('Day'),
  	time: state.MainFormReducer.get('Time'),
  	user_id: state.UserReducer.get('userId')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  	submit: (body) => dispatch(getTrains(body))
  };
};

const SubmitButton = React.createClass({

	render() {
		const {
			submit,
			start,
			destination,
			day, 
			time,
			user_id
		} = this.props;

		return (
			<button onClick={() => submit({start, destination, day, time, user_id})}>Find Trains</button>
		);
	}


});

export default connect(mapStateToProps, mapDispatchToProps)(SubmitButton);