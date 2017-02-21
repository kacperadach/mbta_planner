import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { setFormValue } from '../actions/formActions';
import Select from 'react-select';
import { getTimeOptions } from '../utils/time';


// const getHour = (time) => {

// };

// const getMinute = (time) => {

// };

// const getAmPm = (time) => {

// };


const mapStateToProps = (state, props) => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setFormVal: (label, value) => dispatch(setFormValue(label, value))
	};
};

const TimeSelect = React.createClass({

	getDefaultProps() {
		return {
			initial: ''
		}
	},

	getInitialState() {
		return {
			value: '',
			changed: false
		}
	},

	componentWillReceiveProps(nextProps) {
		const {
			changed
		} = this.state;

		if (!changed) {
			this.setState({'value': nextProps.initial});
		}
	},

	componentWillMount() {
		const {
			initial
		} = this.props;

		this.setState({'value': initial});
	},

	handleChange(option) {
		this.setState({'changed': true});
		if (option === null) {
			this.setState({'value': null});
		}
		else {
			this.setState({'value': option['value']});
		}
	},

	render() {
		const {
			label, 
			initial,
			options
		} = this.props;

		const {
			value,
			changed
		} = this.state;

		return (
			<div>
				<label>{label}</label>
				<Select value={value} options={getTimeOptions(value)} onChange={this.handleChange}/>
			</div>
		);
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeSelect);