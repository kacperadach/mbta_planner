import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SubSelect from '../components/SubSelect';
import TimeSelect from '../components/TimeSelect';
import { Days } from '../constants/days';
import SubmitButton from '../components/SubmitButton';
import { Col, Row, Collapse } from 'react-bootstrap';
import UserSearches from '../components/UserSearches';


const mapStateToProps = (state, props) => {
  return {
    'stations': state.MainContainerReducer.get('stations'),
    'currentTime': state.MainContainerReducer.get('currentTime'),
    'searches': state.UserReducer.get('searches')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const MainForm = React.createClass({

  getInitialState() {
    return {
      showSearches: false
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.searches.length > 0) {
      this.setState({showSearches: true});
    } else {
      this.setState({showSearches: false});
    }
  },

  render() {

    const {
      stations,
      currentTime,
      searches
    } = this.props;

    const {
      showSearches
    } = this.state;

    return (
      <div className="main-form">
        <Row className="station-inputs">
          <Col md={6}>
            <SubSelect label="Start" options={stations} />
          </Col>
          <Col md={6}>
            <SubSelect label="Destination" options={stations} />
          </Col>
        </Row>
        <Row className="station-inputs">
          <Col md={6}>
            <TimeSelect label="Time" initial={currentTime} />
          </Col>
          <Col md={6}>
            <SubSelect label="Day" initial="Today" options={Days} />
          </Col>
        </Row>
        <div className="user-seaches-div">
          <Collapse transitionAppear={true} in={showSearches}>
            <UserSearches />
          </Collapse>
        </div>
        <SubmitButton />
      </div>
    );
  }
});

MainForm.propTypes = {
  stations: PropTypes.array,
  currentTime: PropTypes.string
};


export default connect(mapStateToProps, mapDispatchToProps)(MainForm);
