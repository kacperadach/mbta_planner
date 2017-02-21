import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { setFormValue } from '../actions/formActions';
import Select from 'react-select';


const mapStateToProps = (state, props) => {
	return {
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		setFormVal: (label, value) => dispatch(setFormValue(label, value))
	}
};

const SubSelect = React.createClass({

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

	componentWillMount() {
		const {
			initial
		} = this.props;

		this.setState({'value': initial});
	},

	handleChange(option) {
		const {
			setFormVal,
			label
		} = this.props;

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
				<Select value={value} options={options} onChange={this.handleChange}/>
			</div>
		);
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(SubSelect);