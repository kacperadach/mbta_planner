import React, { PropTypes } from 'react';
import { getStationOptions } from '../actions/trainActions';
import { connect } from 'react-redux';
import MainForm from '../components/MainForm';
import TrainResults from '../components/TrainResults';
import { getNextTime } from '../actions/formActions';

const mapStateToProps = (state, props) => {
		return {
		};
};

const mapDispatchToProps = (dispatch) => {
		return {
				getStations: () => dispatch(getStationOptions()),
				currentTimeTimeout: () => dispatch(getNextTime())
		};
};

const MainComponent = React.createClass({

		componentWillMount() {
				const {
						getStations,
						currentTimeTimeout
				} = this.props;

				//init app calls
				getStations();
				currentTimeTimeout();
		},

		render() {
				return (
					<div>
						<MainForm />
						<TrainResults />
					</div>
				);
		}
});

MainComponent.propType = {
		getStations: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
