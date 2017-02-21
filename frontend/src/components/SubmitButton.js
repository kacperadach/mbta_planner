import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getTrains } from '../actions/trainActions';

const mapStateToProps = (state, props) => {
  return {
  	start: state.MainFormReducer.get('Start'),
  	destination: state.MainFormReducer.get('Destination'),
  	day: state.MainFormReducer.get('Day')
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
			day
		} = this.props;

		return (
			<button onClick={() => submit({start, destination, day, hour: 1, minute: 2})} />
		);
	}


});

export default connect(mapStateToProps, mapDispatchToProps)(SubmitButton);