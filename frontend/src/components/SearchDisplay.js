import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Panel, Button, Glyphicon, Col, Row } from 'react-bootstrap';

const mapStateToProps = (state, props) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const SearchDisplay = React.createClass({

	render() {
		const {
			search
		} = this.props;

		return (
			<div className="search-display">
				<Button bsSize="large">
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
								<p>{search['dest']}</p>
							</Col>
						</Row>
						<Row>
							<Col xs={4} md={4}>
								<p>Day: </p>
							</Col>
							<Col xs={4} md={4}>
								<p>{search['timing']}</p>
							</Col>
						</Row>
					</div>
				</Button>
			</div>
		);
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchDisplay);