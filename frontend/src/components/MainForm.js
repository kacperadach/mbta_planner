import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SubSelect from '../components/SubSelect';
import TimeSelect from '../components/TimeSelect';
import { Days } from '../constants/days';
import SubmitButton from '../components/SubmitButton';
import { Col, Row } from 'react-bootstrap';
import UserSearches from '../components/UserSearches';


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
          <UserSearches />
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
