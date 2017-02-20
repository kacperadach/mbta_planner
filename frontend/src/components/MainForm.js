import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SubForm from '../components/SubForm';


const mapStateToProps = (state, props) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

class MainForm extends Component {
  render() {

    return (
      <div>
        <SubForm label="Start" />
        <SubForm label="Destination" />
        <SubForm label="Day" initial="Today" />
      </div>
    );
  }
};

MainForm.propTypes = {
  value: PropTypes.number,
  increment: PropTypes.func
};


export default connect(mapStateToProps, mapDispatchToProps)(MainForm);
