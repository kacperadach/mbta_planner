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
					<Row>
						<Col xs={6} xsOffset={6}>
							<Button className="delete-search-button" bsSize="small"><Glyphicon glyph="glyphicon glyphicon-trash"/></Button>
						</Col>
					</Row>
					<small>{search['start']}</small>
					<p>{search['dest']}</p>
					<p>{search['timing']}</p>
				</Button>
			</div>
		);
	}


});

export default connect(mapStateToProps, mapDispatchToProps)(SearchDisplay);