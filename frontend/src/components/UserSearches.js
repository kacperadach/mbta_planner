import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import TrainDisplay from '../components/TrainDisplay';
import { Panel } from 'react-bootstrap';

const mapStateToProps = (state, props) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const UserSearches = React.createClass({

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
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSearches);