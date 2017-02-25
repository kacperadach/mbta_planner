import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';

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
		console.log(search);

		return (
			<div>
				<Panel header={<h3>Search</h3>} bsStyle="primary">
					<p>{search['start']}</p>
					<p>{search['dest']}</p>
					<p>{search['timing']}</p>
				</Panel>
			</div>
		);
	}


});

export default connect(mapStateToProps, mapDispatchToProps)(SearchDisplay);