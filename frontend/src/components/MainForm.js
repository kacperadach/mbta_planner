import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SubSelect from '../components/SubSelect';
import TimeSelect from '../components/TimeSelect';
import { Days } from '../constants/days';
import SubmitButton from '../components/SubmitButton';


const mapStateToProps = (state, props) => {
  return {
    'stations': state.MainContainerReducer.get('stations'),
    'currentTime': state.MainContainerReducer.get('currentTime')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const MainForm = React.createClass({

  render() {

    const {
      stations,
      currentTime
    } = this.props;

    console.log(currentTime);

    return (
      <div>
        <SubSelect label="Start" options={stations} />
        <SubSelect label="Destination" options={stations} />
        <TimeSelect label="Time" initial={currentTime} />
        <SubSelect label="Day" initial="Today" options={Days} />
        <SubmitButton />
      </div>
    );
  }
});

MainForm.propTypes = {
  value: PropTypes.number,
  increment: PropTypes.func
};


export default connect(mapStateToProps, mapDispatchToProps)(MainForm);
