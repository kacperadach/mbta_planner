import { combineReducers } from 'redux';
import MainFormReducer from './MainFormReducer';
import MainContainerReducer from './MainContainerReducer';
import TrainResultReducer from './TrainResultReducer';
import UserReducer from './User';

const rootReducer = combineReducers({
    MainContainerReducer,
    MainFormReducer,
    TrainResultReducer,
    UserReducer
});

export default rootReducer;
