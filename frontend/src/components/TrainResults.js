import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TrainDisplay from '../components/TrainDisplay';
import { Panel } from 'react-bootstrap';

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

		if (Trains.size === 0) {
			return (
				<div>
					<Panel header={<h3>No Trains Found</h3>} bsStyle="danger">You're shit out of luck</Panel>
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