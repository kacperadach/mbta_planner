import React, { PropTypes } from 'react';
import { getStationOptions, getAllTimes } from '../actions/trainActions';
import '../css/main.css';
import { connect } from 'react-redux';
import MainForm from '../components/MainForm';
import TrainResults from '../components/TrainResults';
import UserSearches from '../components/UserSearches';
import { getNextTime } from '../actions/formActions';
import { updateUserId } from '../actions/userActions';
import { Col, Row, PageHeader, Label } from 'react-bootstrap';

const mapStateToProps = (state, props) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStations: () => dispatch(getStationOptions()),
    currentTimeTimeout: () => dispatch(getNextTime()),
    getTimes: () => dispatch(getAllTimes()),
    updateUserId: () => dispatch(updateUserId())
  };
};

const MainComponent = React.createClass({

  componentWillMount() {
    const {
        getStations,
        currentTimeTimeout,
        getTimes,
        updateUserId
    } = this.props;

    //init app calls
    getStations();
    currentTimeTimeout();
    getTimes();

    updateUserId();
  },

  render() {
    return (
      <div className="main-container">
        <PageHeader>
          <h1>Mass Commuter Rail Train Checker</h1>
        </PageHeader>
        <MainForm />
        <TrainResults />
      </div>
    );
  }
});

MainComponent.propType = {
    getStations: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
