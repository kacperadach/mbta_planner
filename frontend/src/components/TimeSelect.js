import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { setFormValue } from '../actions/formActions';
import Select from 'react-select';
import { getTimeOptions } from '../utils/time';

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
			initial,
			label,
			setFormVal
		} = this.props;

		this.setState({'value': initial});
		setFormVal(label, initial);
	},

	handleChange(option) {
		const {
			setFormVal,
			label
		} = this.props;

		this.setState({'changed': true});
		if (option === null) {
			this.setState({'value': null});
		}
		else {
			this.setState({'value': option['value']});
			setFormVal(label, option['value']);
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