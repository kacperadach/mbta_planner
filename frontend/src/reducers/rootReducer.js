import { combineReducers } from 'redux';
import MainFormReducer from './MainFormReducer';
import MainContainerReducer from './MainContainerReducer';
import TrainResultReducer from './TrainResultReducer';

const rootReducer = combineReducers({
    MainContainerReducer,
    MainFormReducer,
    TrainResultReducer
});

export default rootReducer;
