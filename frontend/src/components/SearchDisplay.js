import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Panel, Button, Glyphicon, Col, Row } from 'react-bootstrap';
import { getTrains } from '../actions/trainActions';

const mapStateToProps = (state, props) => {
  return {
  	time: state.MainFormReducer.get('Time'),
  	user_id: state.UserReducer.get('userId')
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  	searchAgain: (body) => dispatch(getTrains(body))
  };

  	// 
  
};

const SearchDisplay = React.createClass({

	render() {
		const {
			search,
			searchAgain,
			time,
			user_id
		} = this.props;

		const {
			start,
			destination,
			day
		} = search;

		const again = {again: true};

		return (
			<div className="search-display">
				<Button bsSize="large" onClick={() => searchAgain({start, destination, day, time, user_id, again})}>
					<div className="button-content">
						<Row>
							<Col md={2} mdPush={9}>
								<Button className="delete-search-button" bsSize="small"><Glyphicon glyph="glyphicon glyphicon-trash"/></Button>
							</Col>
						</Row>
						<Row>
							<Col xs={4} md={4}>
								<p>Start: </p>
							</Col>
							<Col xs={4} md={4}>
								<p>{search['start']}</p>
							</Col>
						</Row>
						<Row>
							<Col xs={4} md={4}>
								<p>Destination: </p>
							</Col>
							<Col xs={4} md={4}>
								<p>{search['destination']}</p>
							</Col>
						</Row>
						<Row>
							<Col xs={4} md={4}>
								<p>Day: </p>
							</Col>
							<Col xs={4} md={4}>
								<p>{search['day']}</p>
							</Col>
						</Row>
					</div>
				</Button>
			</div>
		);
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchDisplay);