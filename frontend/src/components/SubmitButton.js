import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getTrains } from '../actions/trainActions';
import { Button } from 'react-bootstrap';
import { getUserSearches } from '../actions/userActions';
import { resetSearched } from '../actions/searchActions';

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
  	submit: (body, user_id) => {dispatch(getTrains(body)); dispatch(getUserSearches(user_id))},
    clear: () => dispatch(resetSearched())
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
			user_id,
      clear
		} = this.props;

		return (
			<div className="submit-button-div">
				<Button className="submit-button" bsStyle="primary" onClick={() => submit({start, destination, day, time, user_id}, user_id)}>Find Trains</Button>
        <Button className="clear-button" bsStyle="warning" onClick={clear}>Clear</Button>
			</div>
		);
	}


});

export default connect(mapStateToProps, mapDispatchToProps)(SubmitButton);