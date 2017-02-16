import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { sampleAction } from '../actions/sampleAction';

const mapStateToProps = (state, props) => {
  return {
    value: state.sampleReducer.get('value')
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch(sampleAction())
  }
};

class SampleComponent extends Component {
  render() {
    const {
      value,
      increment
    } = this.props;

    return <button type='button' onClick={increment}>{value}</button>;
  }
};

SampleComponent.propTypes = {
  value: PropTypes.number,
  increment: PropTypes.func
};


export default connect(mapStateToProps, mapDispatchToProps)(SampleComponent);
