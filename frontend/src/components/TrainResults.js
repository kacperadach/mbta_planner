'use es6';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TrainDisplay from '../components/TrainDisplay';

const mapStateToProps = (state, props) => {
  return {
  	'Trains': state.TrainResultReducer.get('Trains'),
  	'Searched': state.TrainResultReducer.get('Searched')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const TrainResults = React.createClass({

	displayTrains() {
		const {
			Trains
		} = this.props;

		if (Trains.size == 0) {
			return (
				<div>
					<p>No Trains Found</p>
				</div>
			);
		}

		return (
			<div>
				{Trains.map((t, key) => {
					return (
						<TrainDisplay key={key} train={t} />
					);
				})}
			</div>
		);
	},

	render() {
		const {
			Searched
		} = this.props;

		return (
			<div>
				{Searched ? this.displayTrains() : null}
			</div>
		);
	}


});

export default connect(mapStateToProps, mapDispatchToProps)(TrainResults);