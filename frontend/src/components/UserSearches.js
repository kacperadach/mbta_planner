import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SearchDisplay from '../components/SearchDisplay';
import { Panel, PanelGroup } from 'react-bootstrap';

const mapStateToProps = (state, props) => {
  return {
  	'searches': state.UserReducer.get('searches')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const UserSearches = React.createClass({

	render() {
		const {
			searches
		} = this.props;

		if (searches.length === 0) {
			return null;
		}

		// return (
		// 	<div>
		// 		<PanelGroup defaultActiveKey="1">
		// 			<Panel header={<strong>Recent Searches</strong>} eventKey="1">
		// 				<div className="search-display-flex">
		// 					{searches.map((s, key) => {
		// 						return (
		// 							<SearchDisplay key={key} search={s} />
		// 						);
		// 					})}
		// 				</div>
		// 			</Panel>
		// 		</PanelGroup>
		// 	</div>
		// );
		return (
			<div>
				<div className="search-display-flex">
					{searches.map((s, key) => {
						return (
							<SearchDisplay key={key} search={s} />
						);
					})}
				</div>
			</div>
		);
	}


});

UserSearches.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSearches);