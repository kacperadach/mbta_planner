import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getTrains } from '../actions/trainActions';

const capitalizeFirstLetter = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};


const mapStateToProps = (state, props) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const TrainResults = React.createClass({

	render() {
		const {
			train
		} = this.props;

		return (
			<div>
				<p>{train.get('train').get('train_number')} - {train.get('train').get('train_line')} - {capitalizeFirstLetter(train.get('train').get('timing'))}</p>
				<p>{train.get('start').get('station')} ({train.get('start').get('time')}) - {train.get('dest').get('station')} ({train.get('dest').get('time')})</p>
			</div>
		);
	}


});

export default connect(mapStateToProps, mapDispatchToProps)(TrainResults);