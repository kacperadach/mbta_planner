import React, { PropTypes } from 'react';
import { getStationOptions, getAllTimes } from '../actions/trainActions';
import { connect } from 'react-redux';
import MainForm from '../components/MainForm';
import TrainResults from '../components/TrainResults';
import UserSearches from '../components/UserSearches';
import { getNextTime } from '../actions/formActions';
import { updateUserId } from '../actions/userActions';

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
      <div>
        <MainForm />
        <TrainResults />
        <UserSearches />
      </div>
    );
  }
});

MainComponent.propType = {
    getStations: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
