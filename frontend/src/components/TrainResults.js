import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TrainDisplay from '../components/TrainDisplay';
import { Panel } from 'react-bootstrap';
import { getToday } from '../utils/time';

const mapStateToProps = (state, props) => {
  return {
  	Trains: state.TrainResultReducer.get('Trains'),
  	Searched: state.TrainResultReducer.get('Searched'),
  	start: state.MainFormReducer.get('Start'),
  	destination: state.MainFormReducer.get('Destination'),
  	day: state.MainFormReducer.get('Day')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const getDay = (day) => {
	if (day == 'Today') {
		return 'today';
	} else {
		return `on ${getToday()}`;
	}

};

const TrainResults = React.createClass({

	displayTrains() {
		const {
			Trains,
			start,
			destination,
			day
		} = this.props;

		if (Trains.size === 0) {
			return (
				<div>
					<Panel header={<h3>{`No Trains Found from ${start} to ${destination} ${getDay(day)}`}</h3>} bsStyle="danger" />
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

TrainResults.propTypes = {
	Trains: PropTypes.array,
	Searched: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(TrainResults);