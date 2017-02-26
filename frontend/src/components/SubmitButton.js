import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getTrains } from '../actions/trainActions';
import { Button } from 'react-bootstrap';
import { getUserSearches } from '../actions/userActions'

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
  	submit: (body, user_id) => {dispatch(getTrains(body)); dispatch(getUserSearches(user_id))}
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
			<Button bsStyle="primary" onClick={() => submit({start, destination, day, time, user_id}, user_id)}>Find Trains</Button>
		);
	}


});

export default connect(mapStateToProps, mapDispatchToProps)(SubmitButton);