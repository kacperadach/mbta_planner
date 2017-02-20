import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setFormValue } from '../actions/formActions';


const mapStateToProps = (state, props) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
	setFormVal: (label, value) => dispatch(setFormValue(label, value))
  }
};


const SubForm = React.createClass({

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

	handleSubmit(event) {
		event.preventDefault();
	},

	handleChange(event) {
		const {
			setFormVal,
			label
		} = this.props;

		const {
			value,
			changed
		} = this.state;

		if (!changed) {
			const newChar = event.target.value[event.target.value.length-1];
			this.setState({changed: true, value: newChar});
			setFormVal(label, newChar);
		}
		else {
			this.setState({value: event.target.value});
			setFormVal(label, event.target.value);
		}

		// if (event.target.value == '') {
		// 	this.setState({changed: false, value: ''});
		// }
	},

	render() {
		const {
			label, 
			initial
		} = this.props;

		const {
			value,
			changed
		} = this.state;

		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					{label}
					<input type="text" value={changed ? value : initial} onChange={this.handleChange} />
				</label>
			</form>
		);
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(SubForm);